const jwt = require('jsonwebtoken')
const { ERROR, SUCCESS } = require('../utils/constant')
const secret = process.env.JWT_SECRET;

module.exports = {
  authenticate: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return ERROR(res, 401, false, 'Token is null');

    jwt.verify(token, secret, (err, user) => {
      if (err) return ERROR(res, 403, false, 'Token is not valid');
      req.user = user;
      next();
    });
  }
}
