CREATE TABLE IF NOT EXISTS projects(
    id SERIAL PRIMARY KEY,
    Project_Name varchar(255) NOT NULL,
    Description Text,
    Tech_Stack varchar(255),
    Link varchar(255)
);