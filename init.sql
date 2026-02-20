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
VALUES ('Node.js'), ('Express.js'), ('PostgreSQL'), ('Python'), ('Flask'), ('PyTorch'), ('Socket.io'), ('Redis');

INSERT INTO projects (Project_Name, Description, Tech_Stack, Link)
VALUES (
        'Library Management System',
        'A web-based application built with Flask, PostgreSQL, and HTML/CSS/JavaScript that enables efficient management of library operations. The system allows users to manage books, track issued and returned books, and maintain member records. It provides a simple, interactive interface for librarians to perform CRUD operations on books and members, while the backend handles data storage and business logic securely using PostgreSQL. This LMS is designed for easy deployment and scalability for small to medium libraries.',
        'HTML, CSS, JavaScript, Python, Flask, PostgreSQL, psycopg2, Jinja2',
        'https://github.com/Rimuru41'
    ),
    (
        'Football Penalty Shootout',
        'A Football Penalty Shootout Game created in Python with Pygame, where the player participates in a penalty shootout scenario against an opponent. The game includes graphical soccer elements and interactive controls powered by Pygame, making it a fun, simple desktop football‑style game.',
        'Python, Pygame',
        'https://github.com/Rimuru41'
    ),
    (
        'Plastic Detection and Classification System',
        'This project is a Plastic Detection and Classification System that uses deep learning models to detect and categorize different types of plastics from images and live video feeds. The system combines YOLO (You Only Look Once) object detection with a CNN (Convolutional Neural Network) classifier to accurately identify plastic types in real‑time or static images. It’s designed for environmental monitoring or automated waste sorting applications, demonstrating practical use of computer vision for plastic pollution analysis.',
        'Python, Flask, YOLO (YOLOv9), Keras/TensorFlow (CNN models), OpenCV, HTML, CSS, JavaScript',
        'https://github.com/Rimuru41'
    ),
    (
        'Spiking Retentive Network',
        'Spiking RetNet is a Python‑based deep learning project that combines spiking neural networks (SNNs) with Retentive Network (RetNet)‑style architectures and web interface elements. The repository includes a backend built with Flask, integrates SNN support via frameworks like SpikingJelly, and uses PyTorch and transformer libraries suggesting it aims to explore spiking versions of network architectures for sequence or temporal data processing, possibly with a dashboard or demo UI. This kind of model blends biologically inspired spiking neural computation (event‑driven, energy‑efficient) with modern deep learning constructs , a research‑oriented approach to more efficient neural architectures',
        'Python, Flask, PyTorch, SpikingJelly, scikit‑learn, HTML, CSS',
        'https://github.com/Rimuru41'
    ),
    (
        'Real-Time Multiplayer Quiz Game',
        'A real-time multiplayer quiz game where players can join a lobby and answer questions simultaneously. The backend is built with Express.js, handling game logic, scoring, and player sessions. WebSockets are used to synchronize the game state between multiple players in real time, ensuring everyone sees questions and scores live. PostgreSQL stores user profiles, game history, and high scores, making it easy to track progress and maintain persistent data. The frontend (HTML/CSS/JavaScript) provides a simple, interactive interface for players to participate in quizzes.',
        'PostgreSQL, Express.js, Node.js, WebSocket (ws), HTML, CSS, JavaScript',
        'https://github.com/Rimuru41'
    ),
    (
        'Sentinel: Real-Time Service Monitoring & Audit System',
        'Sentinel is a real-time service monitoring and audit system that tracks the status of multiple services, records their actions, and broadcasts logs instantly. It uses Redis to maintain online/offline heartbeats, PostgreSQL to store batched audit logs efficiently, and Socket.io for real-time updates to connected clients. Designed for scalability and concurrency, Sentinel ensures reliable monitoring and auditing for microservices or multi-service environments, with a simulator to stress-test multiple services simultaneously.',
        'Node.js, Express.js, PostgreSQL, Redis, Socket.io, JavaScript, HTML, CSS',
        'https://github.com/Rimuru41'
    ),
    (
        'Personal Portfolio',
        'This project is a Personal Portfolio Website that showcases a developer’s work, skills, and contact information with a sleek, professional design. It features a built-in Admin Dashboard (protected by login) that enables real-time management of projects and skills using AJAX, eliminating the need to interact with the database manually.',
        'Node.js, Express.js, PostgreSQL, EJS, CSS, JavaScript, AJAX/Fetch API',
        'https://github.com/Rimuru41'
    );

-- Default admin user (username: admin, password: admin123)
INSERT INTO admin_users (username, password_hash)
VALUES ('White_Testarossa', '$2b$12$gCg8AWKxQOSnoaygKq4zBu0SAkM.J5bu8P/XIgymKM.tPNLAGLAc6');

