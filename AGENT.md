# Places App

A React Native Expo app with NestJS backend for tracking and viewing saved places on a map.

## Project Structure

- `/backend` - NestJS API with GraphQL (Apollo Server) and Prisma ORM
  - `src/common/relay/` - Relay helpers (Node interface, PageInfo, connection helpers)
  - `src/places/` - Places module with GraphQL resolvers and service
  - `src/prisma/` - Prisma service and module
  - `prisma/` - Prisma schema and seed data
- `/frontend` - React Native Expo app with Apollo Client
  - `src/graphql/` - Apollo Client setup and GraphQL queries
  - `src/screens/` - Screen components (HomeScreen)
  - `src/components/` - Reusable components (MapView, ListView)
  - `src/types/` - TypeScript type definitions
- `docker-compose.yml` - Postgres database for dev and prod

## Technology Stack

### Backend
- NestJS 10+ with GraphQL (code-first approach using decorators)
- @nestjs/graphql with ApolloDriver
- Prisma ORM with PostgreSQL
- Auto-generated schema at `backend/src/schema.graphql`

### Frontend
- Expo (React Native)
- Apollo Client (switched from Relay for simplicity)
- react-native-maps for MapView
- TypeScript

**Note:** Originally planned to use Relay, but switched to Apollo Client as it's simpler and doesn't require strict Connection/Node patterns on the frontend.

### Database
- PostgreSQL 15 (via Docker Compose)
- Connection: `postgresql://places:places_dev_password@localhost:5432/places`

## GraphQL Schema

The backend uses a Relay-compliant schema with:
- **Node interface** with global IDs (base64 encoded `"Place:<uuid>"`)
- **Place type**: id, name, description, category, rating, lat, lng, address, city, state, country, imageUrl
- **PlaceConnection**: Relay-style pagination with edges, pageInfo, totalCount
- **Query.searchPlaces**: Supports cursor pagination (first, after) and filters (text, category, bbox)
- **Query.node**: Relay node resolver for fetching by global ID

## Package Manager

Use **yarn** for all operations (not npm).

## Common Commands

### Start Everything
```bash
yarn docker:up          # Start Postgres
yarn dev                # Start both backend and frontend
```

### Backend
```bash
cd backend
yarn start:dev          # Start NestJS in watch mode
yarn build              # Build for production
npx prisma migrate dev  # Create and apply migrations
npx prisma db seed      # Seed Melbourne places data
npx prisma studio       # Open Prisma Studio (DB GUI)
```

### Frontend
```bash
cd frontend
yarn start              # Start Expo dev server
yarn android            # Run on Android
yarn ios                # Run on iOS (macOS only)
yarn web                # Run in web browser
```

### Docker
```bash
yarn docker:up          # Start Postgres container
yarn docker:down        # Stop and remove containers
docker-compose logs -f  # View Postgres logs
```

## Database Schema

See `backend/prisma/schema.prisma` for full schema.

**Place model:**
- id (UUID, primary key)
- name, description, category (enum: RESTAURANT, BAR, PUB, CAFE, OTHER)
- rating (float, nullable)
- lat, lng (float, required)
- address, city, state, country, imageUrl (nullable)
- source, sourceId (for deduplication)
- Indexes on: lat, lng, category
- Unique constraint on: [source, sourceId]

## Dummy Data

The seed script creates 12 Melbourne places (restaurants, bars, pubs, cafes) including:
- Chin Chin, Hardware Société, Ponyfish Island, Cookie
- The Local Taphouse, Seven Seeds, Cumulus Inc., Movida
- The Everleigh, The Napier Hotel, Industry Beans, Higher Ground

## App Features

### Implemented
- Home screen with Map/List toggle button
- MapView showing all places as markers (centered on Melbourne)
- ListView showing places in a scrollable list with name, category, rating
- GraphQL query with Apollo Client for fetching places
- Loading and error states

### To Do
- Search functionality to filter places by text, category, bbox
- Save/unsave places (user management)
- Pagination support (load more on scroll)
- Place details modal
- User location tracking

## GraphQL Playground

When backend is running: http://localhost:3000/graphql

## Environment Variables

Backend uses `.env` file (never commit this):
```
DATABASE_URL="postgresql://places:places_dev_password@localhost:5432/places?schema=public"
```

## Code Style

- Use TypeScript for all new code
- Follow existing patterns in the codebase
- Backend: Code-first GraphQL with decorators (@ObjectType, @Field, @Resolver, @Query)
- Frontend: Functional components with hooks

## Common Issues & Solutions

### Backend TypeScript Errors
- Prisma models return `null` for nullable fields, but GraphQL expects `undefined`
- Always map Prisma results to GraphQL types with `?? undefined` for nullable fields
- Don't spread Prisma objects directly - explicitly map fields to avoid including DB-only fields (source, sourceId, createdAt, updatedAt)

### Frontend
- Apollo Client connects to `http://localhost:3000/graphql` (update for production)
- react-native-maps requires platform-specific setup (see Expo docs)
- HomeScreen handles toggle state between 'map' and 'list' views

---

# git

- Delete unused or obsolete files when your changes make them irrelevant (refactors, feature removals, etc.), and revert files only when the change is yours or explicitly requested. If a git operation leaves you unsure about other agents' in-flight work, stop and coordinate instead of deleting.
- Before attempting to delete a file to resolve a local type/lint failure, stop and ask the user. Other agents are often editing adjacent files; deleting their work to silence an error is never acceptable without explicit approval.
- NEVER edit .env or any environment variable files—only the user may change them.
- Coordinate with other agents before removing their in-progress edits—don't revert or delete work you didn't author unless everyone agrees.
- Moving/renaming and restoring files is allowed.
- ABSOLUTELY NEVER run destructive git operations (e.g., git reset --hard, rm, git checkout/git restore to an older commit) unless the user gives an explicit, written instruction in this conversation. Treat these commands as catastrophic; if you are even slightly unsure, stop and ask before touching them. (When working within Cursor or Codex Web, these git limitations do not apply; use the tooling's capabilities as needed.)
- Never use git restore (or similar commands) to revert files you didn't author—coordinate with other agents instead so their in-progress work stays intact.
- Always double-check git status before any commit
- Keep commits atomic: commit only the files you touched and list each path explicitly. For tracked files run git commit -m "<scoped message>" -- path/to/file1 path/to/file2. For brand-new files, use the one-liner git restore --staged :/ && git add "path/to/file1" "path/to/file2" && git commit -m "<scoped message>" -- path/to/file1 path/to/file2.
- Quote any git paths containing brackets or parentheses (e.g., src/app/[candidate]/**) when staging or committing so the shell does not treat them as globs or subshells.
- When running git rebase, avoid opening editors—export GIT_EDITOR=: and GIT_SEQUENCE_EDITOR=: (or pass --no-edit) so the default messages are used automatically.
- Never amend commits unless you have explicit written approval in the task thread.


