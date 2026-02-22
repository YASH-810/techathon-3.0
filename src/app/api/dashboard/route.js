import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { MOCK_CAREERS, runRecommendationEngine } from "@/lib/recommendationEngine";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: "Missing User ID in query" }, { status: 400 });
        }

        await connectDB();
        const user = await User.findById(userId).lean();
        if (!user) {
            return NextResponse.json({ error: "User profile not found" }, { status: 404 });
        }

        // Step 1: Reconstruct the full active match calculations using their saved quiz map against the mock careers array
        const percentageMap = user.quizResults?.interestProfile || {};
        const topMatches = runRecommendationEngine(user, percentageMap);

        // Step 2: Grab full details for the specific career they selected
        const primaryMatch = MOCK_CAREERS.find(c => c._id === String(user.selectedCareer)) || topMatches[0]; // fallback top1 if none selected

        // Step 3: Bundle and standardize response payload mapping to Dashboard layout needs
        return NextResponse.json({
            success: true,
            data: {
                primaryMatch: {
                    title: primaryMatch.title,
                    // Extract specific match dynamically from the recalculation array
                    matchPercentage: topMatches.find(tm => tm._id === primaryMatch._id)?.matchPercentage || 0,
                    description: primaryMatch.description,
                    marketDemand: primaryMatch.marketDemand >= 85 ? "High Demand" : "Growing Demand",
                    salaryRange: primaryMatch.salaryRange,
                    readinessTime: user.estimatedTimeline || `${primaryMatch.avgReadinessMonths} months`
                },
                otherMatches: topMatches.map(match => ({
                    title: match.title,
                    match: match.matchPercentage,
                    desc: match.description.substring(0, 100) + "..."
                })).slice(0, 3) // Return top 3 alternatives
                ,
                skillGap: user.skillGap || { strong: [], improve: [], missing: [] },
                roadmap: user.roadmap || [],

                // Return exactly what the engine calculated breakdown-wise for their top match
                scoreBreakdown: [
                    { label: "Interest Alignment", value: topMatches.find(tm => tm._id === primaryMatch._id)?.breakdown.interest || 0, max: 30 },
                    { label: "Skill Compatibility", value: topMatches.find(tm => tm._id === primaryMatch._id)?.breakdown.skills || 0, max: 30 },
                    { label: "Academic Strength", value: topMatches.find(tm => tm._id === primaryMatch._id)?.breakdown.academic || 0, max: 20 },
                    { label: "Market Demand", value: topMatches.find(tm => tm._id === primaryMatch._id)?.breakdown.market || 0, max: 20 }
                ]
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Dashboard Fetch Error:", error);
        return NextResponse.json({ error: "Server Error Fetching Details" }, { status: 500 });
    }
}
