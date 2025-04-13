// controllers/uploadController.js
const loadCSV = require('../utils/csvLoader');
const path = require('path');

exports.uploadCSV = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send('Aucun fichier reçu.');
    }

    for (const file of files) {
      await loadCSV(path.resolve(file.path));
    }

    res.send('Tous les fichiers ont été traités avec succès.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors du traitement des fichiers CSV.');
  }
};
