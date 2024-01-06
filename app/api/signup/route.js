import Signup from "@/mongoose/models/registerSchema";
import mongooseconection from "@/mongoose/mongooseconection";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    
    try {
        const { name, email, password } = await request.json();
        console.log(name, email, password);
        const hashPassword=await bcrypt.hash(password,10)
        await mongooseconection();
        await Signup.create({ name, email, password:hashPassword });
        return NextResponse.json({
            message: 'Signup  user successfully ',
            success: true,
        }, {
            status: 200
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: 'error some occured put data !',
            success: false,
        }, {
            status: 500
        });

    }
}

export async function GET(request) {
    try {
        await mongooseconection();
      const signup=  await Signup.find();
        return NextResponse.json({ signup });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: 'error some occured in Get data !',
            success: false,
        }, {
            status: 500
        });
    }
}