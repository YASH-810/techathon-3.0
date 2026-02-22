import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Career from "@/models/Career";
import { analyzeSkillGap } from "@/lib/skillGapEngine";
import { generateRoadmap } from "@/lib/roadmapGenerator";
import { MOCK_CAREERS } from "@/lib/recommendationEngine"; // Use mock db since it's asked in prompt

export async function POST(req) {
    try {
        const { userId, careerId } = await req.json();

        if (!userId || !careerId) {
            return NextResponse.json({ error: "Missing required details" }, { status: 400 });
        }

        await connectDB();
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Usually query Career Model, using MOCK static data as requested:
        const selectedCareerDetails = MOCK_CAREERS.find(c => c._id === careerId);
        if (!selectedCareerDetails) {
            return NextResponse.json({ error: "Career not found in database" }, { status: 404 });
        }

        // Step 1: Compare required vs user strengths to find Skill Gap
        const skillGap = analyzeSkillGap(selectedCareerDetails, user);
        user.skillGap = skillGap;

        // Step 2: Generate Timeline / Roadmap phases based on their Weekly Hours and missing skills
        const { estimatedTimeline, roadmap } = generateRoadmap(user.weeklyStudyHours, selectedCareerDetails.requiredSkills);
        user.estimatedTimeline = estimatedTimeline;
        user.roadmap = roadmap;

        // Finally Save Career Choice + Meta
        user.selectedCareer = selectedCareerDetails._id;
        await user.save();

        return NextResponse.json({
            success: true,
            message: "Career locked in. Roadmap generated."
        }, { status: 200 });

    } catch (error) {
        console.error("Select Career Error:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
