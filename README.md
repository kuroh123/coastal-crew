# Test Credentials - 
Admin
- email - admin@gmail.com
- password - admin

Volunteer
- email - vol@gmail.com
- password - vol

# Beach Cleanup Management System

A comprehensive web application for organizing and managing beach cleanup events, built with Next.js, Prisma, and PostgreSQL. This system provides separate portals for administrators and volunteers to streamline event management and participation.

![Beach Cleanup Management System](https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🌊 Features

### Admin Portal
- **Event Management**: Create, update, and manage cleanup events with detailed information
- **Volunteer Management**: View registrations and track attendance for each event
- **QR Code Generation**: Generate unique QR codes for each event for easy check-in
- **Dashboard Analytics**: Overview of events, volunteers, and attendance statistics
- **Real-time Monitoring**: Track event progress and volunteer participation

### Volunteer Portal
- **Event Discovery**: Browse upcoming cleanup events by location and date
- **Easy Registration**: Simple registration process for events
- **Personal Dashboard**: View registered events, attendance history, and upcoming events
- **QR Code Check-in**: Scan QR codes on-site to confirm participation
- **Event History**: Track personal contribution to beach cleanup efforts

## 🚀 Tech Stack

- **Frontend**: Next.js 13+ with App Router, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT with bcrypt password hashing
- **UI Components**: Custom components with Lucide React icons
- **QR Code**: QR code generation and scanning functionality

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- PostgreSQL database running
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd beach-cleanup-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the `.env.example` file to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```
   
   Update the following variables in `.env`:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/beach_cleanup"
   
   # JWT Secret (use a strong, random string)
   JWT_SECRET="your-super-secret-jwt-key-here"
   
   # Base URL
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 🗄️ Database Schema

The application uses the following main entities:

- **User**: Stores user information (admins and volunteers)
- **Event**: Beach cleanup events with details and metadata
- **EventRegistration**: Tracks volunteer registrations for events
- **Attendance**: Records actual attendance via QR code check-ins

## 🔐 Authentication & Authorization

- **JWT-based authentication** with secure token storage
- **Role-based access control** (ADMIN, VOLUNTEER)
- **Protected routes** with authentication guards
- **Password hashing** using bcrypt

## 🎨 UI/UX Features

- **Responsive design** optimized for mobile and desktop
- **Modern interface** with ocean-inspired color scheme
- **Smooth animations** and hover effects
- **Loading states** and error handling
- **Accessible design** with proper focus management
- **Professional styling** with Tailwind CSS

## 🧪 Development

### Running in Development Mode
```bash
npm run dev
```

### Database Management
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma db push --force-reset

# Generate new migration
npx prisma migrate dev --name migration_name
```

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database management with [Prisma](https://prisma.io/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Images from [Pexels](https://pexels.com/)

---

**Made with 🌊 for cleaner beaches and a better environment**
