const jwt = require('jsonwebtoken');
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

    jwt.verify(token, process.env.JWT_PUBLIC_KEY, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Ops.. token de autenticação inválido' });

        req.userId = decoded.id;

        return next();
    });
}