/**
 * recommendationEngine.js
 * Analyzes Interest Scores (Tags) against Mock static Career Database.
 * Employs weighted formula:
 * Interest Match: 30%
 * Skill Compatibility: 30%
 * Academic Strength: 20%
 * Market Demand: 20%
 */

// Mock DB of careers
export const MOCK_CAREERS = [
    {
        _id: "65d8c11e0a29",
        title: "Software Engineer",
        interestTags: ["technology", "analytical", "creative"],
        requiredSkills: ["JavaScript", "React", "Node.js", "Algorithms"],
        marketDemand: 95,
        description: "Design and build software systems and applications.",
        avgReadinessMonths: 6,
        salaryRange: "$80k - $140k"
    },
    {
        _id: "65d8c11e0a30",
        title: "Data Analyst",
        interestTags: ["analytical", "business", "technology"],
        requiredSkills: ["SQL", "Python", "Data Visualization", "Statistics"],
        marketDemand: 85,
        description: "Interpret massive data pools to help businesses make decisions.",
        avgReadinessMonths: 4,
        salaryRange: "$65k - $95k"
    },
    {
        _id: "65d8c11e0a31",
        title: "Digital Marketer",
        interestTags: ["creative", "communication", "business"],
        requiredSkills: ["SEO", "Content Strategy", "Social Media", "Analytics"],
        marketDemand: 80,
        description: "Architect and manage campaigns to promote digital products.",
        avgReadinessMonths: 3,
        salaryRange: "$50k - $85k"
    },
    {
        _id: "65d8c11e0a32",
        title: "Product Manager",
        interestTags: ["business", "communication", "analytical"],
        requiredSkills: ["Agile", "Roadmapping", "UI/UX understanding", "Leadership"],
        marketDemand: 90,
        description: "Guide the conception to launch of complex technology products.",
        avgReadinessMonths: 8,
        salaryRange: "$90k - $150k"
    },
    {
        _id: "65d8c11e0a33",
        title: "UX/UI Designer",
        interestTags: ["creative", "technology", "social"],
        requiredSkills: ["Figma", "User Research", "Wireframing", "Prototyping"],
        marketDemand: 82,
        description: "Design human-centered and beautiful user experiences.",
        avgReadinessMonths: 5,
        salaryRange: "$70k - $110k"
    }
];

export function runRecommendationEngine(userProfile, tagScoresMap) {
    // 1. Calculate Interest Affinity
    // Find highest tag from quiz
    const topTag = Object.keys(tagScoresMap).reduce((a, b) => tagScoresMap[a] > tagScoresMap[b] ? a : b, "");

    const formattedCareers = MOCK_CAREERS.map(career => {

        // Feature 1: Interest Match (30%)
        // Check if the user's top tags align with the career's tags
        let interestMatchPoints = 0;
        career.interestTags.forEach(tag => {
            if (tagScoresMap[tag]) {
                // give weight normalized from quiz percentages
                interestMatchPoints += tagScoresMap[tag];
            }
        });
        // scale to max 100 for this breakdown
        const interestScore = Math.min(100, (interestMatchPoints * 1.5));

        // Feature 2: Skill Compatibility (30%)
        // (We treat this as baseline 50 for naive calculation before knowing their actual raw skills, 
        // but scale up if they picked matching subjects like 'Computer Science')
        let skillScore = 50;
        if (userProfile.major && userProfile.major.toLowerCase().includes("computer") && career.interestTags.includes("technology")) {
            skillScore += 35;
        }

        // Feature 3: Academic Strength (20%)
        let academicScore = 60; // baseline
        if (userProfile.educationStage === "Graduate") academicScore += 20;

        // Feature 4: Market Demand (20%)
        const marketScore = career.marketDemand;

        // Apply strict weighted calculation
        const weightedTotal =
            (interestScore * 0.30) +
            (skillScore * 0.30) +
            (academicScore * 0.20) +
            (marketScore * 0.20);

        return {
            ...career,
            matchPercentage: Math.round(weightedTotal),
            breakdown: {
                interest: Math.round(interestScore),
                skills: Math.round(skillScore),
                academic: Math.round(academicScore),
                market: Math.round(marketScore)
            },
            reason: `Aligned heavily with your preference for ${topTag}-related activities and strong market scaling.`
        };
    });

    // Sort by highest match %
    formattedCareers.sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Return top 3
    return formattedCareers.slice(0, 3);
}
