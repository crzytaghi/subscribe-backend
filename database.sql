CREATE DATABASE  subscribe;

CREATE TABLE users (
  id uuid PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE subscriptions (
  id uuid PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  transaction_date DATE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL
);

-- Enable the uuid-ossp extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Alter the users table to use uuid_generate_v4() as the default value for the id
ALTER TABLE subscriptions
ALTER COLUMN id SET DEFAULT uuid_generate_v4();
