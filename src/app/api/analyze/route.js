import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { runRecommendationEngine } from "@/lib/recommendationEngine";

export async function POST(req) {
    try {
        const { userId, answers } = await req.json();

        if (!userId || !answers || !Array.isArray(answers)) {
            return NextResponse.json({ error: "Missing answers or User ID" }, { status: 400 });
        }

        // Step 1: Initialize tagScores object
        const tagScores = {
            technology: 0,
            business: 0,
            creative: 0,
            science: 0,
            communication: 0,
            analytical: 0,
            social: 0,
            practical: 0,
        };

        // Step 2 & 3: Loop through generated answers & calculate normalize
        let totalQuestions = 0;
        answers.forEach((answer) => {
            const { tag } = answer;
            if (tagScores[tag] !== undefined) {
                tagScores[tag] += 1;
                totalQuestions += 1;
            }
        });

        // Translate counts into % scale
        const percentageMap = {};
        Object.keys(tagScores).forEach(key => {
            percentageMap[key] = totalQuestions > 0 ? Math.round((tagScores[key] / totalQuestions) * 100) : 0;
        });

        await connectDB();
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Update User with mapping generated above
        user.quizResults = {
            interestProfile: percentageMap,
        };
        await user.save();

        // Step 4: Execute our algorithmic recommendation engine and format result structure
        // Passing user profile specifics plus normalized tags map.
        const topMatches = runRecommendationEngine(user, percentageMap);

        return NextResponse.json({
            success: true,
            interestProfile: percentageMap,
            recommendations: topMatches
        });

    } catch (error) {
        console.error("Analysis Error:", error);
        return NextResponse.json({ error: "Failed to analyze quiz data" }, { status: 500 });
    }
}
