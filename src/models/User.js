import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    educationStage: { type: String, required: true, enum: ['After 10th', 'After 12th', 'Graduate'] },
    weeklyStudyHours: { type: String, required: true },

    // Phase 2 Details based on Stage
    subjects: [{
        name: String,
        grade: String
    }],
    degree: String,
    major: String,
    cgpaRange: String,

    // Assessment Storage
    quizResults: {
        interestProfile: { type: Map, of: Number }, // Breakdown of technology: 20%, business: 30%, etc.
    },

    // Final Choice & Roadmapping
    selectedCareer: { type: mongoose.Schema.Types.ObjectId, ref: 'Career' },
    skillGap: {
        strong: [String],
        improve: [String],
        missing: [String]
    },
    roadmap: [{
        phase: Number,
        title: String,
        duration: String,
        status: { type: String, default: 'not-started' }, // not-started, in-progress, completed
        progress: { type: Number, default: 0 },
        skills: String
    }],
    estimatedTimeline: String,

}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
