import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            fullName, email, password, educationStage, weeklyStudyHours,
            subjects, degree, major, cgpaRange
        } = body;

        // Validate core logic
        if (!fullName || !email || !password || !educationStage || !weeklyStudyHours) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await connectDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUserPayload = {
            fullName,
            email,
            password: hashedPassword,
            educationStage,
            weeklyStudyHours,
        };

        // Parse Phase 2 based on condition
        if (['After 10th', 'After 12th'].includes(educationStage)) {
            newUserPayload.subjects = subjects || [];
        } else if (educationStage === 'Graduate') {
            newUserPayload.degree = degree;
            newUserPayload.major = major;
            newUserPayload.cgpaRange = cgpaRange;
        }

        const newUser = await User.create(newUserPayload);

        return NextResponse.json({
            success: true,
            message: "User registered successfully",
            userId: newUser._id
        }, { status: 201 });

    } catch (error) {
        console.error("Registration Error", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
