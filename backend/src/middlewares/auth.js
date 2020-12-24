const { verify } = require('../services/token');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Vish.. você não tem uma autorização pra acessar aqui!' });
    }

    const parts = authHeader.split(' ');
    if (!parts.length === 2) {
        return res.status(401).json({ message: 'Ops.. token de autenticação inválido' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: 'Ops.. formatação incorreta do token' });
    }

    const authorization = verify(token);

    if (!authorization) {
        return res.status(401).json({ message: 'Ops.. token de autenticação inválido' });
    }

    req.user_id = authorization.id;

    return next();
};