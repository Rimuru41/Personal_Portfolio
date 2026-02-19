import express from 'express';
import { dirname, sep } from 'path';
import { fileURLToPath } from 'url';
import pool from './db/connect.js';
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

app.get((req, res) => {
    res.status(404).render('404');
})
app.listen(cfg.port, () => {
    console.log(`Server is running on port http://localhost:${cfg.port}`);
})

