import express from 'express';
import { dirname, sep } from 'path';
import { fileURLToPath } from 'url';
import pool from './db/connect.js';
import { add_project, delete_project, update_project } from './models/manager.js';
const __dirname = fileURLToPath(dirname(import.meta.url));

const app = express();
const cfg = {
    port: process.env.APP_PORT || 3000,
    dir: {
        root: __dirname,
        static: __dirname + sep + 'static',
        views: __dirname + sep + 'views',

    }
}

app.use(express.static(cfg.dir.static))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', cfg.dir.views);

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects');
        const projects = result.rows;
        res.render('projects', { projects });

    }
    catch (err) {
        console.error('Error fetching projects:', err);
        res.send("Error fetching data from database");

    }
})
// Add this to your existing app.js
app.get('/api/skills', (req, res) => {
    const mySkills = ["Node.js", "Express", "PostgreSQL", "Docker", "UI/UX Design", "C++"];
    res.json({ skills: mySkills });
});

// POST - Add new project
app.post('/api/projects', async (req, res) => {
    try {
        await add_project(req.body);
        res.json({ success: true });
    } catch (err) {
        console.error('Error adding project:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// PUT - Update project
app.put('/api/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await update_project(id, req.body);
        res.json({ success: true });
    } catch (err) {
        console.error('Error updating project:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE - Delete project
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await delete_project(id);
        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting project:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get((req, res) => {
    res.status(404).render('404');
})
app.listen(cfg.port, () => {
    console.log(`Server is running on port http://localhost:${cfg.port}`);
})

