
# Mentorship System

REST API for a mentorship system mentors publish services and availability, mentees book session and administrators manage users and roles

## Stack

- Node.js 22
- TypeScript
- Express 5
- PostgreSQL with Kysely
- Redis 
- Better Auth 
- OpenAPI/Swagger

# Requirements

- Node.js 22+
- pnpm
- PostgreSQL
- Redis


# Getting Started

## Clone the Repository

```bash
git clone <https://github.com/mahi2025/Mentorship_Sys.git>
cd <Mentorship_Sys>
```

## Install Dependencies

```bash
pnpm install
```


## Setup Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env`:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/mentorship
REDIS_URL=redis://localhost:6379
BETTER_AUTH_SECRET=replace-with-at-least-32-characters
BETTER_AUTH_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

## Run Prisma Migration

Create database tables

```bash
pnpm migrate:auth
pnpm migrate
pnpm seed
```
---


## Start the Server

```bash
pnpm dev
```

Server runs at:

```
http://localhost:5000
```

API documentation is available at `http://localhost:5000/docs`

