const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createUser() {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'anishgithub890@gmail.com' }
    });

    if (existingUser) {
      console.log('User already exists, updating password...');
      const hashedPassword = await bcrypt.hash('anish@123', 12);
      
      await prisma.user.update({
        where: { email: 'anishgithub890@gmail.com' },
        data: {
          password: hashedPassword
        }
      });
      console.log('Password updated successfully');
    } else {
      // Create new user
      const hashedPassword = await bcrypt.hash('anish@123', 12);
      
      const user = await prisma.user.create({
        data: {
          name: 'Anish Mahato',
          email: 'anishgithub890@gmail.com',
          password: hashedPassword,
          userType: 'ADMIN'
        }
      });

      console.log('User created successfully:', user.email);
    }
  } catch (error) {
    console.error('Error creating/updating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUser(); 