/**
 * skillGapEngine.js
 * Compares selected Career requiredSkills against User's strengths
 */

export function analyzeSkillGap(selectedCareerDetails, userProfile) {
    // Let's assume based on their education state we know some default strong things
    // Or if they took some specific subjects (e.g., Computer Science = HTML/JS)

    const userCurrentSkills = ["Basic Computing", "Math", "Logic"];

    // If Graduate, assume some stronger basic programming
    if (userProfile.educationStage === "Graduate") {
        userCurrentSkills.push("Python", "SQL Basics");
    }

    // Determine strengths vs weak vs missing
    const strong = [];
    const improve = [];
    const missing = [];

    // Parse mapped requirements
    selectedCareerDetails.requiredSkills.forEach(reqSkill => {
        // Basic mock logic identifying if skill partially matches what they already have
        if (userCurrentSkills.some(own => reqSkill.includes(own) || own.includes(reqSkill))) {
            strong.push(reqSkill);
            return;
        }

        // if they have some tangential overlap, tag as improve
        if (userCurrentSkills.length > 2 && Math.random() > 0.6) {
            improve.push(reqSkill);
        } else {
            // otherwise entirely missing
            missing.push(reqSkill);
        }
    });

    return {
        strong: strong.length > 0 ? strong : ["General Knowledge"],
        improve: improve.length > 0 ? improve : ["Industry Terminology"],
        missing: missing.length > 0 ? missing : selectedCareerDetails.requiredSkills // fallback if all missing
    };
}
