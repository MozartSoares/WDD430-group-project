# 📁 Project Folder Structure

## Overview

This project follows Next.js 15 App Router conventions with a clear separation between frontend and backend code using Route Groups and organized folders.

## 🏗️ Main Structure

src/
├── app/ # Next.js App Router
│ ├── (frontend)/ # Frontend routes (Route Group)
│ ├── api/ # Backend API endpoints
│ ├── globals.css # Global styles
│ └── layout.tsx # Root layout
├── components/ # React components
├── server/ # Backend business logic
├── lib/ # Shared utilities
├── models/ # Database models
├── hooks/ # Custom React hooks
└── types/ # TypeScript type definitions

## 📂 Detailed Structure

### `app/` - Next.js App Router

- **`(frontend)/`** - All frontend pages and layouts
  - Route Group (parentheses don't affect URLs)
  - Contains all user-facing pages
  - Has its own layout for frontend-specific components
- **`api/`** - Backend API routes
  - RESTful endpoints following `/api/*` pattern
  - Each folder represents a resource (users, products, auth)
  - Uses `route.ts` files for HTTP methods

### `components/` - React Components

- Reusable UI components
- Organized by feature or type (ui, forms, layout)
- Frontend-only code

### `server/` - Backend Logic

- **`controllers/`** - Request handlers and business logic
- **`services/`** - Data processing and external integrations
- **`middleware/`** - Custom middleware functions
- **`utils/`** - Backend-specific utilities

### `lib/` - Shared Utilities

- Database connections
- Authentication helpers
- Validation schemas
- Cross-cutting concerns

### `models/` - Database Models

- Mongoose schemas and models
- Database entity definitions
- Backend-only code

### `hooks/` - Custom React Hooks

- Reusable stateful logic
- API calls and data fetching
- Frontend-only code

### `types/` - TypeScript Definitions

- Shared type definitions
- API response types
- Model interfaces

## 🛣️ Routing Examples

### Frontend Routes

- `app/(frontend)/page.tsx` → `/`
- `app/(frontend)/products/page.tsx` → `/products`
- `app/(frontend)/about/page.tsx` → `/about`

### API Routes

- `app/api/users/route.ts` → `/api/users`
- `app/api/products/[id]/route.ts` → `/api/products/123`
- `app/api/auth/login/route.ts` → `/api/auth/login`

## 📋 Conventions

1. **Route Groups**: Use `(frontend)` for grouping without affecting URLs
2. **API Routes**: Use `route.ts` files with named exports (GET, POST, PUT, DELETE)
3. **Components**: PascalCase naming for component files
4. **Types**: Descriptive names with `.ts` extension
5. **Models**: Singular PascalCase names (User.ts, Product.ts)

## 🎯 Benefits

- **Clear Separation**: Frontend and backend code are easily distinguishable
- **Scalability**: Each layer can grow independently
- **Team Collaboration**: Developers can focus on specific areas
- **Maintainability**: Logical organization makes finding code easier
- **Next.js Compliance**: Follows framework best practices

## 🚀 Getting Started

1. Frontend development → Focus on `app/(frontend)/`, `components/`, `hooks/`
2. Backend development → Focus on `app/api/`, `server/`, `models/`
3. Shared utilities → Use `lib/`, `types/`

### Environment Variables

Create `.env.local`:
