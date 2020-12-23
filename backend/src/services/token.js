const jwt = require('jsonwebtoken');
require('dotenv').config();

const signOptions = {
    algorithm: 'RS256',
    expiresIn: '1d'
}

const sign = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, signOptions);
    return token;
}

module.exports = { sign };