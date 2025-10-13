const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    console.log('Connecting to database...');

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@anishmahato.dev' }
    });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@anishmahato.dev',
        password: hashedPassword,
        phoneNumber: '1234567890',
        countryCode: '+971',
        userType: 'ADMIN',
        isVerified: true,
      }
    });

    console.log('Admin user created successfully');
    console.log('Email: admin@anishmahato.dev');
    console.log('Password: admin123');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Disconnected from database');
  }
}

createAdminUser(); 