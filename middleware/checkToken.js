// middleware/checkToken.js
const db = require('../config/db');

function isValidKey(encodedKey) {
  try {
    let key = encodedKey.replace("Bearer ", "");
    console.log(key);
    const rawKey = Buffer.from(key, 'base64').toString('utf-8');
    return rawKey.length === 32 && /^[A-Za-z0-9]+$/.test(rawKey);
  } catch (e) {
    return false;
  }
}

async function checkToken(req, res, next) {
  const token = req.headers['authorization'] || req.query.token || req.body.token;
  console.log(token);
  if (!token) return res.status(403).json({ error: 'Token required' });

  if (!isValidKey(token)) return res.status(401).json({ error: 'Invalid token' });

  next();
}

module.exports = checkToken;
