
# Mentroship system

A scalable backend API for a mentorship platform where mentors can create services, define their availability, receive bookings, collect payments, and receive reviews. Mentees can browse mentors, book sessions, make payments, and receive notifications.

# Project Overview
The Mentorship System provides an online platform connecting mentors with mentees. It follows REST API principles and uses a modular architecture for maintainability and scalability.

# Features
- User Management
- Mentor Profiles
- Services
- Payments
- Reviews
- Notifications

# Tech Stack
Backend: Node.js, TypeScript, Express.js
Database: PostgresSql
Better Auth

# Project Structure

│src/
│
├── config/
│   ├── env.ts
│   ├── kysely.ts
│   └── database.ts
│
├── database/
│   ├── migrations/
│   └── types.ts
│
├── scripts/
│   ├── create-migration.ts
│   ├── migrate.ts
│   └── rollback.ts
│
└── modules/
    ├── user/
    └── auth/


npm run migrate
    https://xxxx.ngrok-free.app/api/auth/callback/google

    npm run migration:create create_users