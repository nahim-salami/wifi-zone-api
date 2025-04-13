const loadCSV = require('../utils/csvLoader');

exports.uploadCSV = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send('Aucun fichier reçu.');
    }

    let totalInserted = 0;

    for (const file of files) {
      const inserted = await loadCSV(file.buffer);
      console.log(inserted);
      totalInserted++;
    }

    res.send(`${totalInserted} fichier(s) traité(s) avec succès.`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors du traitement des fichiers CSV.');
  }
};
