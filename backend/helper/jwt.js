const jwt = require('jsonwebtoken')

/**
 * 
 * @param {object | string} data 
 * @returns 
 */
function generateAccessToken(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

/**
 * 
 * @param {string} token 
 * @param {Function(error: any, data: any)} callback 
 */
function verifyAccessToken(token, callback) {
  jwt.verify(token, process.env.TOKEN_SECRET, callback)
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
}