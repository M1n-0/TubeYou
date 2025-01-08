const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;

// Dossier où sont stockées les vidéos
const videoFolder = path.join(__dirname, 'video');

// Permettre l'accès aux fichiers statiques (vidéos, images)
app.use('/video', express.static(videoFolder));
app.use(express.static('public')); // Pour servir votre fichier HTML

// Charge les fichiers du dossier assets.
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Charge les fichiers html du dossier html
app.use('/html', express.static(path.join(__dirname, 'html')));

// charge le fichier index.html comme page root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour récupérer la liste des vidéos
app.get('/video', (req, res) => {
    fs.readdir(videoFolder, (err, files) => {
      if (err) {
        console.error('Erreur lors de la lecture du dossier vidéo:', err);
        return res.status(500).send('Erreur serveur');
      }
  
      // Filtrer uniquement les fichiers vidéo (extension .mp4, etc.)
      const videos = files.filter(file => file.endsWith('.mp4'));
      res.json(videos);
    });
  });

app.listen(port, '0.0.0.0', () => {
    console.log(`TubeYou listening at http://localhost:${port}`);
});