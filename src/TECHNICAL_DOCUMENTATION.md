# XCien App - Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Database Schema](#database-schema)
5. [API Architecture](#api-architecture)
6. [Authentication System](#authentication-system)
7. [Data Sources](#data-sources)
8. [Component Structure](#component-structure)
9. [Pages and Routes](#pages-and-routes)
10. [Development Setup](#development-setup)
11. [Deployment](#deployment)
12. [API Endpoints](#api-endpoints)
13. [Security Considerations](#security-considerations)

## Project Overview

XCien App is a comprehensive network monitoring and management application designed to provide real-time insights into network infrastructure. The application monitors devices, processors, memory pools, and generates detailed reports for network administrators.

### Key Features
- Device monitoring and status tracking
- Processor performance monitoring
- Memory pool utilization tracking
- Alert management system
- User authentication and authorization
- Report generation and historical data analysis
- Interactive dashboard with widgets
- Device availability status monitoring

## Architecture

The application follows a modern full-stack architecture with clear separation of concerns:

```
Frontend (Next.js + React)
    ↓
tRPC API Layer
    ↓
Business Logic (Routers)
    ↓
Database Layer (Prisma ORM)
    ↓
PostgreSQL Database
```

### Key Architectural Patterns
- **Server-Side Rendering (SSR)**: Next.js provides SSR capabilities for better performance
- **Type-Safe API**: tRPC ensures end-to-end type safety between frontend and backend
- **Database First**: Prisma ORM with code generation from database schema
- **Component-Based UI**: React components with reusable widgets
- **Middleware Pattern**: Authentication and request processing middleware

## Technology Stack

### Frontend
- **Next.js 15.2.3**: React framework with SSR/SSG capabilities
- **React 19**: UI library with latest features
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework

### Backend
- **tRPC 11.0.0**: Type-safe API framework
- **NextAuth.js**: Authentication library
- **Prisma ORM**: Database toolkit and query builder
- **Zod**: Schema validation library
- **bcrypt**: Password hashing library

### Database
- **PostgreSQL**: Primary database
- **Prisma Client**: Type-safe database client

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## Database Schema

The application uses five main database models:

### User Model
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  credentials   Credential[]
}
```

### Account Model
```prisma
model Account {
  userId            String
  type              String
  provider          String
  providerAccountId String
  // OAuth fields...
  user              User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Session Model
```prisma
model Session {
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Credential Model
```prisma
model Credential {
  id       String @id @default(cuid())
  username String
  password String
  userId   String
  user     User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Report Model
```prisma
model Report {
  id          String   @id @default(cuid())
  content     String
  createdAt   DateTime @default(now())
}
```

## API Architecture

The API is built using tRPC with the following router structure:

### Root Router
Located in `src/server/api/root.ts`, it combines all sub-routers:

```typescript
export const appRouter = createTRPCRouter({
  post: postRouter,
  alert: alertRouter,
  device: deviceRouter,
  processor: processorRouter,
  mempool: mempoolRouter,
  auth: authRouter,
  report: reportRouter,
});
```

### Individual Routers

#### Alert Router (`alert.ts`)
- `get`: Retrieve all alerts

#### Device Router (`device.ts`)
- `get`: Get all monitored devices

#### Processor Router (`processor.ts`)
- `get`: Get all processor information

#### Memory Pool Router (`mempool.ts`)
- `get`: Get all memory pool data

#### Auth Router (`auth.ts`)
- `register`: User registration

#### Report Router (`report.ts`)
- `getReports`: Get all reports for user
- `getReport`: Get specific report
- `createReport`: Generate new report
- `deleteReport`: Remove report

## Authentication System

The application uses NextAuth.js with a custom credentials provider:

### Configuration
Located in `src/server/auth/config.ts`:

```typescript
export const authConfig = {
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Custom authentication logic with bcrypt
      }
    })
  ],
}
```

### Security Features
- Password hashing with bcrypt
- Session management
- CSRF protection
- Secure cookie handling
- JWT token validation

### External APIs
- **Observium API**: Network monitoring data integration
- **Database**: PostgreSQL for persistent data storage

### Environment Configuration
Configuration managed through `src/env.js` with validation:
- Database connection strings
- Authentication secrets
- API endpoints
- External service credentials

## Component Structure

### Core Components

#### Sidebar (`Sidebar.tsx`)
- Navigation menu
- User session management
- Route highlighting

#### Widgets (`widgets/`)
- `ActiveAlerts.tsx`: Real-time alert display
- `AvailabilityStatus.tsx`: Device availability monitoring
- `DeviceStatus.tsx`: Device health dashboard
- `Histogram.tsx`: Data visualization charts
- `LastRebooted.tsx`: Device uptime tracking
- `MemoryPoolStatus.tsx`: Memory utilization display
- `ProcessorsStatus.tsx`: CPU performance metrics
- `SeeMore.tsx`: Expandable data views

#### Utility Components
- `DatePicker.tsx`: Date selection interface
- `TimePicker.tsx`: Time selection interface
- `Modal.tsx`: Modal dialog component
- `ReportGenerator.tsx`: Report creation interface
- `UserIcon.tsx`: User avatar component

## Pages and Routes

### Public Pages
- `/`: Dashboard (requires authentication)
- `/registro`: User registration
- `/unauthorized`: Access denied page

### Protected Pages
- `/alertas`: Alert management interface
- `/reportes`: Report generation and viewing

### API Routes
- `/api/auth/[...nextauth]`: NextAuth.js authentication endpoints
- `/api/trpc/[trpc]`: tRPC API endpoints
- `/api/report/[id]`: Report-specific endpoints

## Development Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation Steps
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Initialize database: `npx prisma migrate dev`
5. Start development server: `npm run dev`

### Environment Variables
```env
DATABASE_URL="postgresql://username:password@localhost:5432/xcien_db"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### Database Commands
- `npx prisma migrate dev`: Apply migrations
- `npx prisma generate`: Generate Prisma client
- `npx prisma studio`: Open database GUI
- `npx prisma db push`: Push schema changes

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Setup
- Configure production database
- Set secure environment variables
- Enable SSL/TLS for database connections
- Configure reverse proxy (nginx/Apache)

### Database Migration
```bash
npx prisma migrate deploy
```

## API Endpoints

### tRPC Endpoints
All API endpoints are accessible through the tRPC client at `/api/trpc/[trpc]`:

#### Device Management
- `device.getAll`: GET all devices
- `device.getById`: GET device by ID
- `device.getStatus`: GET device status

#### Alert System
- `alert.getAll`: GET all alerts
- `alert.create`: POST new alert
- `alert.update`: PUT alert update
- `alert.delete`: DELETE alert

#### Reporting
- `report.getAll`: GET user reports
- `report.create`: POST new report
- `report.getById`: GET report details

#### Authentication
- `auth.register`: POST user registration
- `auth.login`: POST user login

### REST Endpoints
- `GET /api/report/[id]`: Direct report access
- `POST /api/auth/signin`: NextAuth signin
- `POST /api/auth/signout`: NextAuth signout

## Security Considerations

### Authentication Security
- bcrypt password hashing (salt rounds: 12)
- Secure session management
- CSRF token validation
- HTTPOnly cookies

### Database Security
- Parameterized queries (Prisma ORM)
- Connection string encryption
- Role-based access control
- Data validation with Zod schemas

### Application Security
- TypeScript for type safety
- Input validation on all endpoints
- Environment variable protection
- Secure headers configuration

### Best Practices
- Regular dependency updates
- Security audit scanning
- Error handling without information leakage
- Rate limiting considerations
- HTTPS enforcement in production

---

*This documentation is maintained alongside the codebase. For the latest updates, refer to the source code and commit history.*
