import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    interestTags: [{ type: String }], // 'technology', 'analytical', 'creative'
    requiredSkills: [{ type: String }],
    marketDemand: { type: Number, min: 0, max: 100 }, // Scaled 0 to 100 limit
    salaryRange: String,
    avgReadinessMonths: Number,
}, { timestamps: true });

export default mongoose.models.Career || mongoose.model('Career', CareerSchema);
