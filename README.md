# Places App

A full-stack mobile application for discovering and tracking places in Melbourne, built with React Native Expo and NestJS.

## Features

- 🗺️ Interactive map view showing all saved places
- 📝 List view with place details (name, category, rating)
- 🔍 GraphQL API with Relay-compliant schema
- 📍 12+ pre-seeded Melbourne locations (restaurants, bars, cafes, pubs)

## Tech Stack

### Frontend
- **React Native** with Expo
- **Apollo Client** for GraphQL
- **react-native-maps** for map visualization
- TypeScript

### Backend
- **NestJS** with GraphQL (code-first)
- **Apollo Server** with @nestjs/graphql
- **Prisma ORM** with PostgreSQL
- TypeScript

### Database
- **PostgreSQL 15** (via Docker Compose)

## Prerequisites

- Node.js 18+
- Yarn
- Docker & Docker Compose
- Expo CLI (for mobile development)

## Getting Started

### 1. Install Dependencies

```bash
yarn install
```

### 2. Start Database

```bash
yarn docker:up
```

### 3. Set Up Backend

```bash
cd backend

# Run database migrations
npx prisma migrate dev

# Seed database with Melbourne places
npx prisma db seed

# Start backend server
yarn start:dev
```

Backend runs at: http://localhost:3000
GraphQL Playground: http://localhost:3000/graphql

### 4. Start Frontend

```bash
cd frontend

# Start Expo dev server
yarn start

# Or run on specific platform
yarn android  # Android
yarn ios      # iOS (macOS only)
yarn web      # Web browser
```

## Quick Start (All-in-One)

Start everything with one command:

```bash
yarn dev
```

This will:
1. Start PostgreSQL container
2. Start NestJS backend in watch mode
3. Start Expo development server

## Project Structure

```
places/
├── backend/           # NestJS GraphQL API
│   ├── src/
│   │   ├── common/    # Relay helpers (Node, connections)
│   │   ├── places/    # Places module
│   │   └── prisma/    # Prisma service
│   └── prisma/        # Schema & seeds
├── frontend/          # React Native Expo app
│   └── src/
│       ├── components/  # MapView, ListView
│       ├── graphql/     # Apollo Client setup
│       ├── screens/     # HomeScreen
│       └── types/       # TypeScript types
└── docker-compose.yml
```

## GraphQL Schema

The API follows Relay specifications with:

- **Node interface** with global IDs
- **Place type**: id, name, description, category, rating, coordinates, address
- **PlaceConnection**: Cursor-based pagination
- **Query.searchPlaces**: Search with filters (text, category, bounding box)
- **Query.node**: Fetch by global ID

## Database

**Connection String:**
```
postgresql://places:places_dev_password@localhost:5432/places
```

**Place Categories:**
- RESTAURANT
- BAR
- PUB
- CAFE
- OTHER

## Useful Commands

### Backend
```bash
cd backend
yarn start:dev          # Start with hot reload
yarn build              # Build for production
npx prisma migrate dev  # Create migration
npx prisma db seed      # Seed database
npx prisma studio       # Open database GUI
```

### Frontend
```bash
cd frontend
yarn start      # Start Expo
yarn android    # Run on Android
yarn ios        # Run on iOS
yarn web        # Run in browser
```

### Docker
```bash
yarn docker:up      # Start database
yarn docker:down    # Stop database
docker-compose logs -f postgres  # View logs
```

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL="postgresql://places:places_dev_password@localhost:5432/places?schema=public"
```

## Development

The app uses:
- **Yarn workspaces** for monorepo management
- **Prisma** for database migrations and queries
- **Apollo Client** for GraphQL state management
- **Code-first GraphQL** with NestJS decorators

## License

UNLICENSED
