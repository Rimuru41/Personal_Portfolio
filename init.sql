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

INSERT INTO skills (skill_name)
VALUES ('Node.js'), ('Express.js'), ('PostgreSQL'), ('Socket.io');

INSERT INTO projects (Project_Name, Description, Tech_Stack, Link)
VALUES (
        'E-commerce Site',
        'A full-stack store.',
        'Node, Express, PG',
        'https://github.com/Rimuru41'
    ),
    (
        'Chat App',
        'Real-time messaging.',
        'Socket.io, Node',
        'https://github.com/Rimuru41'
    );

-- Default admin user (username: admin, password: admin123)
INSERT INTO admin_users (username, password_hash)
VALUES ('White_Testarossa', '$2b$12$gCg8AWKxQOSnoaygKq4zBu0SAkM.J5bu8P/XIgymKM.tPNLAGLAc6');

