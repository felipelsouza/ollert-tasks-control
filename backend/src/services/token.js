const jwt = require('jsonwebtoken');
require('dotenv').config();

const signOptions = {
    algorithm: 'RS256',
    expiresIn: '1d'
}

const sign = payload => {
    const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, signOptions);
    return token;
}

const verify = token => {
    const authorization = jwt.verify(token, process.env.JWT_PUBLIC_KEY, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) return false;

        return decoded;
    });

    return authorization;
}

module.exports = { sign, verify };