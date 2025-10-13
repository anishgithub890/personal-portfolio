# Anish Mahato - Professional Portfolio

A modern, full-stack portfolio website built with Next.js 14, featuring authentication, real-time chat, and a comprehensive showcase of skills and projects.

## 🚀 Features

### Core Portfolio Features
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Modern UI/UX**: Built with shadcn/ui components and Tailwind CSS
- **Smooth Animations**: Framer Motion for engaging user interactions
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Performance**: Optimized with Next.js 14 and Turbopack

### Authentication System
- **User Registration**: Complete signup with email, phone, and country code
- **User Login**: Secure authentication with NextAuth.js
- **Password Management**: 
  - Forgot password functionality
  - Password reset via email
  - Change password for authenticated users
- **Role-Based Access**: User and Admin roles
- **Session Management**: JWT-based sessions

### Chat System
- **Real-time Messaging**: Users can chat with admin support
- **Message History**: Persistent chat conversations
- **User-Friendly Interface**: Clean chat UI with message timestamps
- **Responsive Chat**: Works on all devices
- **Anonymous Contact Form**: Visitors can send messages without registration

### Admin Features
- **Complete Admin Dashboard**: Comprehensive admin interface with statistics
- **User Management**: View, edit roles, and delete users
- **Message Management**: View all messages with read/unread status
- **Admin Chat Interface**: Dedicated chat interface for responding to users
- **Real-time Statistics**: Live user and message counts
- **Role Management**: Toggle user roles between USER and ADMIN
- **Message Tracking**: Mark messages as read/unread

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern component library
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **NextAuth.js**: Authentication framework
- **bcryptjs**: Password hashing
- **Nodemailer**: Email functionality

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Git**: Version control

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd anish-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   MONGODB_URI=mongodb+srv://anishcsh:anish@@123@cluster0.b5ab196.mongodb.net/anishdatabase
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=mahatoanish284@gmail.com
   SMTP_PASSWORD=cbfzjlxpxakfnbzp
   SMTP_FROM_EMAIL=mahatoanish284@gmail.com
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Create admin user**
   ```bash
   npm run create-admin
   ```
   This creates an admin user with:
   - Email: `admin@anishmahato.dev`
   - Password: `admin123`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

### User Registration
- Navigate to `/auth/signup`
- Fill in required fields (name, email, phone, password)
- Select country code (default: UAE +971)
- Account is created with 'user' role by default

### User Login
- Navigate to `/auth/signin`
- Use email and password to authenticate
- Users are redirected to `/dashboard`
- Admins are redirected to `/admin/dashboard`

### Password Reset
- Click "Forgot password?" on signin page
- Enter email address
- Check email for reset link
- Set new password

## 💬 Chat System

### For Users
- Sign in to access chat functionality
- Navigate to `/chat` or use dashboard link
- Send messages to admin support
- View message history

### For Admins
- Sign in with admin credentials
- Access admin dashboard
- View all users and manage roles
- Respond to user messages

## 📱 Responsive Design

The portfolio is fully responsive and includes:
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Responsive Grid**: Adapts to different screen sizes
- **Touch-Friendly**: Optimized for touch interactions
- **Progressive Enhancement**: Works without JavaScript

## 🎨 Customization

### Colors and Themes
- Edit `src/app/globals.css` for color variables
- Modify `tailwind.config.ts` for theme customization
- Update shadcn/ui theme in CSS variables

### Content
- Update personal information in components
- Modify projects, skills, and experience data
- Customize education information
- Update social media links

### Styling
- Modify component styles in individual files
- Update animations in Framer Motion components
- Customize layout and spacing

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Configure build settings
- **Railway**: Add environment variables
- **DigitalOcean**: Use App Platform

## 📊 Database Schema

### User Model
```typescript
{
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  countryCode: string;
  userType: 'user' | 'admin';
  isVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Message Model
```typescript
{
  senderId: ObjectId;
  receiverId: ObjectId;
  content: string;
  messageType: 'text' | 'file';
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/change-password` - Change password (authenticated)

### Chat
- `GET /api/messages?receiverId=id` - Get messages
- `POST /api/messages` - Send message

### Users (Admin Only)
- `GET /api/users` - Get all users
- `PATCH /api/users` - Update user role

### Portfolio Data
- `GET /api/projects` - Get projects
- `GET /api/experience` - Get experience
- `GET /api/skills` - Get skills

## 🛡️ Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Tokens**: Secure session management
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for production
- **Rate Limiting**: Implemented on sensitive endpoints
- **SQL Injection Protection**: Mongoose ODM protection

## 📈 Performance

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting by Next.js
- **Lazy Loading**: Components load on demand
- **Caching**: Static generation and caching
- **Bundle Analysis**: Optimized bundle sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions:
- Email: anishgithub890@gmail.com
- LinkedIn: [Anish Mahato](https://www.linkedin.com/in/anishpabe)
- WhatsApp: +971508572468
- GitHub: [anishmahato](https://github.com/anishmahato)

## 🎯 Roadmap

- [ ] Real-time notifications
- [ ] File upload in chat
- [ ] Video call integration
- [ ] Blog section
- [ ] Portfolio analytics
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] PWA features

---

**Built with ❤️ by Anish Mahato**
# personal-portfolio
