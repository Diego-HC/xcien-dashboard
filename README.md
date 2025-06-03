# Network Monitoring Application - Technical Documentation

## Overview

The **xcien-app** is a comprehensive network monitoring application built with modern web technologies. It provides real-time monitoring and visualization of network devices, system resources, and alerts across multiple Mexican states. The application features a dashboard with interactive widgets, alert management, and PDF report generation capabilities.

## Technology Stack

### Frontend
- **Framework**: Next.js 15.2.3 with React 19.0.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS with PostCSS
- **Icons**: Heroicons, React Icons, Lucide React
- **Charts**: Recharts for data visualization
- **PDF Generation**: jsPDF + html2canvas-pro

### Backend
- **API Layer**: tRPC 11.0.0 for type-safe APIs
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js 4.24.11
- **Data Validation**: Zod 3.24.2
- **Encryption**: bcryptjs for password hashing

### Development Tools
- **Build Tool**: Next.js with Turbopack
- **Linting**: ESLint with custom configuration
- **Code Formatting**: Prettier
- **Type Checking**: TypeScript compiler

## Architecture

### Project Structure

```
xcien-app/
├── prisma/                 # Database schema and migrations
│   └── schema.prisma
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── DatePicker.tsx
│   │   ├── TimePicker.tsx
│   │   ├── Sidebar.tsx
│   │   ├── UserIcon.tsx
│   │   └── widgets/        # Dashboard widgets
│   │       ├── ActiveAlerts.tsx
│   │       ├── AvailabilityStatus.tsx
│   │       ├── DeviceStatus.tsx
│   │       ├── Histogram.tsx
│   │       ├── MemoryPoolStatus.tsx
│   │       ├── PDFReport.tsx
│   │       ├── ProcessorsStatus.tsx
│   │       └── SeeMore.tsx
│   ├── pages/              # Next.js pages
│   │   ├── _app.tsx        # App wrapper with providers
│   │   ├── index.tsx       # Main dashboard
│   │   ├── alertas.tsx     # Alerts management
│   │   ├── reportes.tsx    # Reports page
│   │   ├── login.tsx       # Authentication
│   │   └── api/            # API routes
│   ├── server/             # Backend logic
│   │   ├── api/            # tRPC routers
│   │   │   ├── root.ts     # Main router
│   │   │   ├── trpc.ts     # tRPC configuration
│   │   │   └── routers/    # Individual API routers
│   │   ├── auth/           # Authentication config
│   │   └── db.ts           # Database connection
│   ├── styles/             # Global styles
│   └── utils/              # Utility functions and types
└── data files/             # JSON data files
    ├── devices.json        # Network devices data
    ├── processors.json     # Processor metrics
    ├── mempools.json       # Memory pool data
    └── bills.json          # Billing information
```

### Data Flow Architecture

1. **Data Sources**: JSON files containing network monitoring data
2. **API Layer**: tRPC routers fetch and process data
3. **Frontend**: React components consume data via tRPC hooks
4. **State Management**: React useState and useMemo for local state
5. **UI Updates**: Real-time dashboard updates with date range filtering

## Core Features

### 1. Dashboard (Main Page)
- **File**: `src/pages/index.tsx`
- **Purpose**: Central monitoring dashboard with multiple widgets
- **Key Components**:
  - Date range picker for filtering data
  - Grid layout with responsive widgets
  - Real-time data visualization

### 2. Widget System
Each widget is a self-contained component that displays specific metrics:

#### Active Alerts Widget
- **File**: `src/components/widgets/ActiveAlerts.tsx`
- **Data Source**: Alert router (`src/server/api/routers/alert.ts`)
- **Displays**: Critical, warning, and other alerts with severity indicators
- **Features**: Date range filtering, severity-based color coding

#### Device Status Widget
- **File**: `src/components/widgets/DeviceStatus.tsx`
- **Data Source**: Device router (`src/server/api/routers/device.ts`)
- **Displays**: Top 5 states by device availability percentage
- **Features**: Real-time status monitoring, geographic grouping

#### Availability Status Widget
- **File**: `src/components/widgets/AvailabilityStatus.tsx`
- **Displays**: Overall network availability as a pie chart
- **Features**: Percentage calculation, visual status representation

#### Processors Status Widget
- **File**: `src/components/widgets/ProcessorsStatus.tsx`
- **Data Source**: Processor router (`src/server/api/routers/processor.ts`)
- **Displays**: Average processor usage across all devices
- **Features**: Usage percentage calculation, pie chart visualization

#### Memory Pool Status Widget
- **File**: `src/components/widgets/MemoryPoolStatus.tsx`
- **Data Source**: Mempool router (`src/server/api/routers/mempool.ts`)
- **Displays**: Average memory usage across all devices
- **Features**: Memory percentage calculation, visual indicators

#### Histogram Widget
- **File**: `src/components/widgets/Histogram.tsx`
- **Displays**: Device uptime distribution in day ranges
- **Features**: Bar chart with 10-day bins, uptime analysis

#### PDF Report Widget
- **File**: `src/components/widgets/PDFReport.tsx`
- **Purpose**: Generate PDF reports from dashboard data
- **Features**: HTML to PDF conversion, widget aggregation

### 3. Alert Management
- **File**: `src/pages/alertas.tsx`
- **Features**: 
  - Alert listing with filtering by date range
  - Device location and status information
  - Real-time alert updates

### 4. Authentication System
- **Files**: `src/server/auth/`, `src/pages/login.tsx`
- **Provider**: NextAuth.js with Prisma adapter
- **Features**: Session management, user authentication

## API Architecture

### tRPC Routers

#### Device Router (`src/server/api/routers/device.ts`)
- **Endpoint**: `/api/device/get`
- **Purpose**: Fetch and process network device data
- **Features**:
  - Date range filtering
  - Geographic grouping by Mexican states
  - Status aggregation
  - Device metadata extraction

#### Alert Router (`src/server/api/routers/alert.ts`)
- **Endpoint**: `/api/alert/get`
- **Purpose**: Retrieve and process alert data
- **Features**:
  - Alert severity classification
  - Device association
  - Status tracking

#### Processor Router (`src/server/api/routers/processor.ts`)
- **Endpoint**: `/api/processor/get`
- **Purpose**: Process CPU usage metrics
- **Data Processing**: JSON parsing, usage calculation

#### Mempool Router (`src/server/api/routers/mempool.ts`)
- **Endpoint**: `/api/mempool/get`
- **Purpose**: Process memory pool usage data
- **Data Processing**: Memory percentage calculation

## Database Schema

### User Management
```sql
-- Authentication tables (NextAuth.js)
Account     # OAuth account information
Session     # User sessions
User        # User profiles
Credential  # User credentials
```

### Core Tables
The application primarily works with JSON data files but uses Prisma for authentication:
- `devices.json`: Network device inventory and status
- `processors.json`: CPU usage metrics
- `mempools.json`: Memory pool statistics

## Security Features

1. **Authentication**: NextAuth.js with session management
2. **Password Hashing**: bcryptjs for secure password storage
3. **Type Safety**: Zod validation for API inputs
4. **Environment Variables**: Secure configuration management

## UI/UX Design

### Layout System
- **Responsive Grid**: CSS Grid with 4-column layout
- **Navigation**: Fixed sidebar with route-based highlighting
- **User Interface**: Clean, professional design with Tailwind CSS

### Color Scheme
- **Primary**: Navy blue (#2A4365)
- **Success**: Green indicators for healthy status
- **Warning**: Yellow for warnings
- **Critical**: Red for critical alerts
- **Neutral**: Gray scale for secondary information

### Interactive Elements
- **Date Pickers**: Range selection for data filtering
- **Hover Effects**: Tooltips and visual feedback
- **Loading States**: Progress indicators for async operations

## Performance Optimizations

1. **React Optimizations**:
   - `useMemo` for expensive calculations
   - Component memoization where appropriate
   - Efficient re-rendering patterns

2. **Data Processing**:
   - Client-side filtering and aggregation
   - Lazy loading of heavy components
   - Efficient JSON parsing

3. **Build Optimizations**:
   - Next.js automatic optimizations
   - Turbopack for faster development builds
   - Tree shaking for smaller bundles

## Development Workflow

### Scripts
```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint checking
npm run lint:fix     # Auto-fix linting issues
npm run typecheck    # TypeScript type checking
npm run format:check # Prettier format checking
npm run format:write # Auto-format code
```

### Database Operations
```bash
npm run db:generate  # Generate Prisma migrations
npm run db:migrate   # Deploy migrations
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
```

## Deployment Considerations

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Authentication secret key
- `NEXTAUTH_URL`: Application URL for authentication

### Production Setup
1. PostgreSQL database setup
2. Environment variable configuration
3. Build and deployment pipeline
4. SSL/TLS certificate setup

## Future Enhancements

### Potential Features
1. **Real-time Updates**: WebSocket integration for live data
2. **Advanced Analytics**: Machine learning for predictive monitoring
3. **Mobile App**: React Native companion application
4. **API Documentation**: OpenAPI/Swagger documentation
5. **Monitoring Alerts**: Email/SMS notification system
6. **Data Export**: CSV/Excel export functionality
7. **Custom Dashboards**: User-configurable widget layouts

### Technical Improvements
1. **Caching Strategy**: Redis integration for performance
2. **Database Migration**: Move from JSON files to full database
3. **Microservices**: Split into smaller, focused services
4. **Testing Suite**: Comprehensive unit and integration tests
5. **CI/CD Pipeline**: Automated testing and deployment

## Troubleshooting

### Common Issues
1. **Database Connection**: Check DATABASE_URL and PostgreSQL status
2. **Build Errors**: Verify Node.js version and dependencies
3. **Authentication Issues**: Check NEXTAUTH configuration
4. **Data Loading**: Verify JSON file paths and formats

### Debugging Tools
1. **Next.js DevTools**: Built-in development tools
2. **React DevTools**: Component inspection
3. **Prisma Studio**: Database GUI
4. **tRPC DevTools**: API call inspection

### Development Setup
1. Clone repository: `git clone https://github.com/Diego-HC/xcien-dashboard.git`
2. Install dependencies: `npm install`
3. Setup environment variables
4. Run database migrations: `npm run db:generate`
5. Start development server: `npm run dev`

