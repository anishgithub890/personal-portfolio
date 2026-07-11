import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
        otpCode: otp,
        otpExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 },
      );
    }

    // Clear OTP after successful verification
    await prisma.user.update({
      where: { id: user.id },
      data: {
        otpCode: null,
        otpExpires: null,
      },
    });

    return NextResponse.json(
      { message: "OTP verified successfully", userId: user.id },
      { status: 200 },
    );
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      {
        error:
          "Authentication service temporarily unavailable. Please try again later.",
      },
      { status: 503 },
    );
  }
}
