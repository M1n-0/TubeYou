function generatePoster(videoElement) {
    // Créer un canvas pour capturer l'image
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Une fois que les métadonnées de la vidéo sont chargées
    videoElement.addEventListener('loadeddata', function() {
        // Définir les dimensions du canvas
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        // Dessiner la première image de la vidéo sur le canvas
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // Extraire l'image en base64
        const dataURL = canvas.toDataURL();

        // Définir l'image extraite comme poster
        videoElement.setAttribute('poster', dataURL);
    }, { once: true }); // L'événement se déclenche une seule fois
}
