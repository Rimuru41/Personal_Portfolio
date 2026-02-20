CREATE TABLE IF NOT EXISTS projects(
    id SERIAL PRIMARY KEY,
    Project_Name varchar(255) NOT NULL,
    Description Text,
    Tech_Stack varchar(255),
    Link varchar(255)
);

CREATE TABLE IF NOT EXISTS admin_users(
    id SERIAL PRIMARY KEY,
    username varchar(100) UNIQUE NOT NULL,
    password_hash varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS skills(
    id SERIAL PRIMARY KEY,
    skill_name varchar(255) NOT NULL
); 
