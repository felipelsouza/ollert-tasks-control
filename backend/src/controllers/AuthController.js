const User = require('../models/User');
const token = require('../services/token');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Ei.. preencha todos os campos!' })
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Ei.. sua senha deve ter 8 ou mais caracteres!' })
    }

    const hasEmail = await User.findOne({ where: { email: email.toLowerCase() } })
        .catch(err => res.status(500).json({ err }));

    if (hasEmail) {
        return res.status(401).json({ message: 'Ops.. Este e-mail já está cadastrado!' });
    }

    const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

    const user = await User.create({ name: name, email: email.toLowerCase(), password: encryptedPassword })
        .catch(err => res.status(500).json({ err }));

    user.password = undefined;

    const generatedToken = token.sign({ id: user.id });

    return res.status(201).json({ message: 'Boa! Usuário registrado com sucesso!', user, token: generatedToken });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } })
        .catch(err => res.status(500).json({ err }));

    if (!user) {
        return res.status(401).json({ message: 'Ops.. parece que seu email não está cadastrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Eita! Senha incorreta!' });
    }

    const generatedToken = token.sign({ id: user.id });

    return res.status(200).json({ message: 'Autenticação efetuada!', token: generatedToken });
};

const logout = async (req, res) => {
    return res.status(200).json({ message: 'Usuário deslogado!', user: req.userId });
};

module.exports = { register, login, logout };