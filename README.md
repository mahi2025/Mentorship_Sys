
# Mentorship System API

REST API for a mentorship platform. Mentors publish services and availability; mentees book sessions; administrators manage users and roles.

## Stack

- Node.js 22 and TypeScript
- Express 5
- PostgreSQL with Kysely
- Redis for rate limiting
- Better Auth for email/password sessions
- Zod and OpenAPI/Swagger for validation and API documentation

## Architecture

Feature code is organized by module. Most requests follow this flow:

```text
route -> controller -> service -> repository -> PostgreSQL
```

- Routes define HTTP paths and authentication/role middleware.
- Controllers parse input and format HTTP responses.
- Services contain business rules such as ownership, availability, and booking transitions.
- Repositories contain Kysely queries.
- Middleware handles authentication, authorization, rate limits, and errors.

## Requirements

- Node.js 22+
- pnpm
- PostgreSQL
- Redis

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/mentorship
REDIS_URL=redis://localhost:6379
BETTER_AUTH_SECRET=replace-with-at-least-32-characters
BETTER_AUTH_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

`FRONTEND_URL` is used for CORS and Better Auth trusted origins.

## Local Development

```bash
pnpm install
pnpm migrate:auth
pnpm migrate
pnpm seed
pnpm dev
```

The API runs on `http://localhost:5000`.

Useful commands:

```bash
pnpm typecheck
pnpm test
pnpm build
pnpm start
pnpm migration:create
pnpm rollback
```

Swagger documentation is available at `http://localhost:5000/docs`.

## Booking Rules

- Booking timestamps must be ISO-8601 strings with an explicit timezone offset or `Z`, for example `2026-10-01T14:00:00Z`.
- The server stores and compares booking timestamps as UTC.
- Availability `day_of_week`, `start_time`, and `end_time` are interpreted in UTC.
- A booking must start at least 15 minutes in the future.
- Pending and confirmed bookings cannot overlap for the same service.
- Booking creation locks the service row in a PostgreSQL transaction to prevent concurrent double booking.
- Mentees can cancel their own bookings.
- Mentors can manage bookings for their own services.
- Administrators can manage any booking.

## Main Endpoints

Authentication is provided under `/api/auth/*` by Better Auth.

| Method | Path | Access |
| --- | --- | --- |
| GET | `/api/health` | Public liveness check |
| GET | `/api/health/ready` | Public readiness check |
| GET | `/api/services` | Public |
| GET | `/api/services/:id` | Public |
| POST | `/api/services` | Mentor |
| PATCH | `/api/services/:id` | Owning mentor |
| POST | `/api/services/:serviceId/availability` | Mentor owning service |
| GET | `/api/services/:serviceId/availability` | Authenticated user |
| POST | `/api/services/:serviceId/bookings` | Mentee |
| PATCH | `/api/bookings/:bookingId/status` | Booking owner, service mentor, or admin |
| GET | `/api/profile/me` | Authenticated user |
| PATCH | `/api/profile/me` | Authenticated user |

## Health Checks

`GET /api/health` is a liveness check. It only confirms that the process is responding.

`GET /api/health/ready` is a readiness check. It verifies PostgreSQL and Redis. A dependency failure returns HTTP `503` so an orchestrator can keep the instance out of service.

## Production Migrations

Application migrations are deployed as a one-shot release job using the same image as the application:

```bash
pnpm migrate:deploy
```

The deployment sequence is:

1. Build and publish the image.
2. Run `pnpm migrate:auth` from the build/CI environment for Better Auth schema changes.
3. Run `pnpm migrate:deploy` as a release job against the production database.
4. Roll out the application containers.

The compiled image contains `dist/database/migrations` and `dist/scripts/migrate.js`, so the application migration release job does not require TypeScript source files or development dependencies. Do not run migrations from every application replica at startup.

## Docker

```bash
docker build -t mentorship-api .
docker run --env-file .env -p 5000:5000 mentorship-api
```

PostgreSQL and Redis are external runtime dependencies and must be reachable using the configured URLs.

