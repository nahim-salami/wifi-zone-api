const csv = require('csv-parser');
const stream = require('stream');
const db = require('../config/db');

async function loadCSVFromBuffer(fileBuffer) {
  const users = [];

  return new Promise((resolve, reject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);

    bufferStream
      .pipe(csv(['username', 'till_time', 'total_time_left', 'actual_profile']))
      .on('data', (row) => {
        const username = row.username?.trim();
        const price = parseFloat(row.actual_profile);

        if (username && !isNaN(price)) {
          users.push([username, username, price]); // username = password
        }
      })
      .on('end', async () => {
        if (users.length === 0) return reject('Aucun utilisateur valide trouvé.');

        const query = 'INSERT INTO users (username, password, price) VALUES ?';
        try {
          await db.query(query, [users]);
          resolve(`${users.length} utilisateurs insérés avec succès.`);
        } catch (err) {
          reject(err);
        }
      })
      .on('error', (err) => reject(err));
  });
}

module.exports = loadCSVFromBuffer;
