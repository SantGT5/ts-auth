-- Create Users Table
CREATE TABLE IF NOT EXISTS users(
    "id" serial PRIMARY KEY,
    "name" varchar(100) NOT NULL,
    "password" varchar(100) NOT NULL,
    "last_name" varchar(100) NOT NULL,
    "email" varchar(100) UNIQUE NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

