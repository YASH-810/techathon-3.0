/**
 * roadmapGenerator.js
 * Generates an educational roadmap categorized into structured phases depending on User Study Hours.
 */

export function generateRoadmap(weeklyStudyHours, requiredSkillsArray) {
    // Translate "10+ hours/week" into a number multiplier for pacing duration
    let intensityDivider = 1;
    if (weeklyStudyHours === "10+ hours/week") intensityDivider = 2; // Twice as fast
    if (weeklyStudyHours === "4 hours/week") intensityDivider = 0.5; // Twice as slow

    // Base constants in weeks mapping to phases
    const BASE_FOUNDATION_WKS = 4;
    const BASE_CORE_WKS = 6;
    const BASE_ADV_WKS = 4;

    const roadmapData = [
        {
            phase: 1,
            title: "Foundation Knowledge",
            duration: `${Math.ceil(BASE_FOUNDATION_WKS / intensityDivider)} Weeks`,
            status: "not-started",
            progress: 0,
            skills: "Industry Basics, Context, Setup"
        },
        {
            phase: 2,
            title: "Core Concepts",
            duration: `${Math.ceil(BASE_CORE_WKS / intensityDivider)} Weeks`,
            status: "not-started",
            progress: 0,
            skills: requiredSkillsArray.slice(0, 2).join(", ")
        },
        {
            phase: 3,
            title: "Advanced Mastery",
            duration: `${Math.ceil(BASE_ADV_WKS / intensityDivider)} Weeks`,
            status: "not-started",
            progress: 0,
            skills: requiredSkillsArray.slice(2).join(", ") || "Specialization Projects"
        }
    ];

    const totalEstimatedWeeks = roadmapData.reduce(
        (acc, phase) => acc + parseInt(phase.duration.split(" ")[0]), 0
    );

    return {
        roadmap: roadmapData,
        estimatedTimeline: `${Math.ceil(totalEstimatedWeeks / 4)} Months`
    };
}
