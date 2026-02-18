import express from 'express';
import { dirname, sep } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(dirname(import.meta.url));

const app = express();
const cfg = {
    port: process.env.PORT,
    dir: {
        root: __dirname,
        static: __dirname + sep + 'static',
        views: __dirname + sep + 'views',

    }
}

app.use(express.static(cfg.dir.static))
app.set('view engine', 'ejs');
app.set('views', cfg.dir.views);

app.get('/', (req, res) => {
    res.send("hi");
})

app.get((req, res) => {
    res.status(404).render('404');
})
app.listen(cfg.port, () => {
    console.log(`Server is running on port ${cfg.port}`);
})

