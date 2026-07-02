CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users(

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  

    first_name VARCHAR(100) NOT NULL,

  

    last_name VARCHAR(100) NOT NULL,

  

    email VARCHAR(255) NOT NULL UNIQUE,

  

    password_hash TEXT NOT NULL,

  

    role VARCHAR(20) NOT NULL DEFAULT 'mentee',

  

    is_verified BOOLEAN NOT NULL DEFAULT FALSE,

  

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

  

    updated_at TIMESTAMP NOT NULL DEFAULT NOW()

);