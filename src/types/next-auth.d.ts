import { UserType } from '@prisma/client';

declare module 'next-auth' {
  interface User {
    userType: UserType;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      userType: UserType;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userType: UserType;
  }
} 