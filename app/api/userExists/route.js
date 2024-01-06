import Signup from "@/mongoose/models/registerSchema";
import mongooseconection from "@/mongoose/mongooseconection";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await mongooseconection();
        const { email } = await request.json();
        const user = await Signup.findOne({ email }).select("_id");
        console.log("user", user);
        return NextResponse.json({ user });

    } catch (error) {
        console.log(error);
    }
}