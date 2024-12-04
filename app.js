const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Dossier où sont stockées les vidéos
const videoDir = path.join(__dirname, 'video');

// Permettre l'accès aux fichiers statiques (vidéos, images)
app.use('/video', express.static(videoDir));
app.use(express.static('public')); // Pour servir votre fichier HTML

// Route pour récupérer la liste des vidéos
app.get('/api/videos', (req, res) => {
    fs.readdir(videoDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la lecture du dossier' });
        }

        // Filtrer les fichiers pour n'obtenir que les vidéos
        const videos = files.filter(file => {
            return file.endsWith('.mp4') || file.endsWith('.webm') || file.endsWith('.ogg');
        }).map(file => {
            return {
                name: path.parse(file).name,
                src: '/video/' + file,
                poster: '/video/' + path.parse(file).name + '.jpg' // Assumer que le poster a le même nom
            };
        });

        res.json(videos);
    });
});

// Serve static files from the "assets" directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve HTML files from the "html" directory
app.use('/html', express.static(path.join(__dirname, 'html')));

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`);
});