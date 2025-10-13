import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is admin
    if (!session?.user || session.user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get counts for each status
    const [total, pending, read, replied, archived] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.count({ where: { status: 'PENDING' } }),
      prisma.contact.count({ where: { status: 'READ' } }),
      prisma.contact.count({ where: { status: 'REPLIED' } }),
      prisma.contact.count({ where: { status: 'ARCHIVED' } }),
    ]);

    return NextResponse.json({
      total,
      pending,
      read,
      replied,
      archived,
    });
  } catch (error) {
    console.error('Error fetching contact counts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 