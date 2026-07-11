const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/anish-portfolio';

// Project Schema
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  featured: Boolean,
  order: Number,
}, { timestamps: true });

// Experience Schema
const ExperienceSchema = new mongoose.Schema({
  company: String,
  position: String,
  description: String,
  startDate: Date,
  endDate: Date,
  current: Boolean,
  technologies: [String],
  order: Number,
}, { timestamps: true });

// Skill Schema
const SkillSchema = new mongoose.Schema({
  name: String,
  category: String,
  proficiency: Number,
  icon: String,
  order: Number,
}, { timestamps: true });

const Project = mongoose.model('Project', ProjectSchema);
const Experience = mongoose.model('Experience', ExperienceSchema);
const Skill = mongoose.model('Skill', SkillSchema);

// Sample data
const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with Next.js, featuring user authentication, payment processing, and admin dashboard.',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com/anishmahato/ecommerce',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    featured: true,
    order: 1
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Framer Motion'],
    githubUrl: 'https://github.com/anishmahato/task-manager',
    liveUrl: 'https://task-manager-demo.vercel.app',
    featured: true,
    order: 2
  },
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website showcasing projects and skills with smooth animations and professional design.',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/anishmahato/portfolio',
    liveUrl: 'https://anishmahato.dev',
    featured: true,
    order: 3
  }
];

const sampleExperience = [
  {
    company: 'TechCorp Solutions',
    position: 'Senior Full Stack Engineer',
    description: 'Leading development of enterprise web applications using React, Node.js, and MongoDB. Mentoring junior developers and implementing best practices for code quality and performance.',
    startDate: new Date('2023-01-01'),
    current: true,
    technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'Docker'],
    order: 1
  },
  {
    company: 'InnovateWeb',
    position: 'Full Stack Engineer',
    description: 'Developed and maintained multiple client websites and web applications. Collaborated with design and product teams to deliver high-quality user experiences.',
    startDate: new Date('2021-01-01'),
    endDate: new Date('2023-01-01'),
    current: false,
    technologies: ['Next.js', 'Express.js', 'PostgreSQL', 'JavaScript', 'Tailwind CSS'],
    order: 2
  }
];

const sampleSkills = [
  { name: 'React', category: 'frontend', proficiency: 95, order: 1 },
  { name: 'Next.js', category: 'frontend', proficiency: 90, order: 2 },
  { name: 'TypeScript', category: 'frontend', proficiency: 88, order: 3 },
  { name: 'Node.js', category: 'backend', proficiency: 85, order: 4 },
  { name: 'MongoDB', category: 'database', proficiency: 85, order: 5 },
  { name: 'PostgreSQL', category: 'database', proficiency: 80, order: 6 },
  { name: 'Docker', category: 'devops', proficiency: 75, order: 7 },
  { name: 'AWS', category: 'devops', proficiency: 70, order: 8 }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Skill.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data
    await Project.insertMany(sampleProjects);
    await Experience.insertMany(sampleExperience);
    await Skill.insertMany(sampleSkills);
    console.log('Sample data inserted successfully');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase(); 
