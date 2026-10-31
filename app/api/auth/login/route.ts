import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, phone, password } = await request.json();

    // Password မပါရင် Error ပြန်မယ်
    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 },
      );
    }

    // Email နဲ့ Phone နှစ်ခုလုံး မပါရင် Error ပြန်မယ်
    if (!email && !phone) {
      return NextResponse.json(
        { error: "Either email or phone is required" },
        { status: 400 },
      );
    }

    // Email သို့မဟုတ် Phone ဖြင့် User ရှိမရှိ ရှာမည်၊ ရှိလျှင် Update လုပ်မည်၊ မရှိလျှင် အသစ်ဖန်တီးမည်
    const query = email ? { email } : { phone };

    await User.findOneAndUpdate(
      query,
      {
        email: email || null,
        phone: phone || null,
        password,
        otp: null, // OTP ကို အစပိုင်းမှာ အလွတ်ထားမယ်
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return NextResponse.json(
      {
        message: "Login successful, proceed to OTP",
        identifier: email || phone,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
