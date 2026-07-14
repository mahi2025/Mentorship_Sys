
# Mentroship system

A scalable backend API for a mentorship platform where mentors can create services, define their availability, receive bookings, collect payments, Mentees can browse mentors, book sessions, make payments. 

# Project Overview
The Mentorship System provides an online platform connecting mentors with mentees. It follows REST API principles and uses a modular architecture for maintainability and scalability.

# Features
- User Management
- Services
- bookings
- Payments

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



   