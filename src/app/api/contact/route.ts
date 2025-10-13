import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sendMessageNotification } from '@/lib/email';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { name, email, phoneNumber, message } = await request.json();

    // Validate required fields
    if (!name || !email || !phoneNumber || !message) {
      return NextResponse.json(
        { error: 'Name, email, phone number, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save contact form data to database
    try {
      const contact = await prisma.contact.create({
        data: {
          name,
          email,
          phoneNumber,
          message,
        },
      });

      console.log('Contact saved to database:', contact.id);
    } catch (dbError) {
      console.error('Error saving contact to database:', dbError);
      return NextResponse.json(
        { error: 'Failed to save contact information' },
        { status: 500 }
      );
    }

    // Send email notifications
    try {
      const userType = session?.user ? `(Logged-in User: ${session.user.name})` : '(Public User)';
      
      await sendMessageNotification(
        name,
        email,
        'Admin',
        'mahatoanish284@gmail.com',
        `Contact Form Submission\nFrom: ${name} ${userType}\nPhone: ${phoneNumber}\n\nMessage:\n${message}`,
        'contact_form'
      );
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Don't fail the request if email fails, just log it
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 