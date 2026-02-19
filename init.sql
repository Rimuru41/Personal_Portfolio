CREATE TABLE IF NOT EXISTS projects(
    id SERIAL PRIMARY KEY,
    Project_Name varchar(255) NOT NULL,
    Description Text,
    Tech_Stack varchar(255),
    Link varchar(255)
);
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