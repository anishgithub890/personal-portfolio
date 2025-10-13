import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const envVars = {
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      MONGODB_URI: !!process.env.MONGODB_URI,
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USERNAME: process.env.SMTP_USERNAME,
      SMTP_PASSWORD: !!process.env.SMTP_PASSWORD,
      SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    };

    return NextResponse.json({
      environment: process.env.NODE_ENV,
      envVars: envVars,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Env check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 