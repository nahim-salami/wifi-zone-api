// controllers/userController.js
const db = require('../config/db');

exports.getUserByPrice = async (req, res) => {
  const price = parseInt(req.params.price);

  const [rows] = await db.query(
    'SELECT * FROM users WHERE price = ? AND used = FALSE LIMIT 1',
    [price]
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: 'No user available at this price' });
  }

  // Marquer comme utilisé
  await db.query('UPDATE users SET used = TRUE WHERE id = ?', [rows[0].id]);

  res.json({
    username: rows[0].username,
    password: rows[0].password,
  });
};
