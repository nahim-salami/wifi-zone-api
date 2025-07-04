// server.js
const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");

app.use(cors({
  origin: 'https://wifiwaba.ahime.net',
  credentials: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://wifiwaba.ahime.net'); // ou '*' pour tout autoriser
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});


// 📦 Connexion à la base de données
const mysql = require('./config/db');

// 🧑 Routes API des utilisateurs (GET avec token etc.)
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);


// 📤 Routes d'upload CSV
const uploadRoutes = require('./routes/upload');
app.use('/api', uploadRoutes);

// 📂 Fichiers uploadés disponibles en accès statique si besoin
app.use('/uploads', express.static('uploads'));

// 🌐 Page d'upload HTML
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});

// 🚀 Démarrage du serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});

mysql.getConnection()
  .then(() => console.log('✅ Connexion MySQL réussie !'))
  .catch((err) => console.error('❌ Erreur de connexion MySQL :', err));