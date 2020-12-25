const User = require('../models/User');

const index = async (req, res) => {
    const { user_id } = req.params;

    try {
        const user = await User.findByPk(user_id, {
            attributes: ['id', 'name', 'email', 'created_at', 'updated_at']
        });

        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ message: 'Não foi possível encontrar o usuário', err });
    };
}

const update = async (req, res) => {
    const { user_id } = req.params;
    const { name } = req.body;

    try {
        const user = await User.findByPk(user_id, {
            attributes: ['id', 'name', 'email', 'created_at', 'updated_at']
        })
            .then(user => user.update({ name }))
            .catch(err => res.status(500).json(err));

        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ message: 'Não foi possível atualizar o usuário', err });
    };
};

const destroy = async (req, res) => {
    const { user_id } = req.params;

    try {
        await User.findByPk(user_id)
            .then(user => user.destroy())
            .catch(err => res.status(500).json(err));

        return res.status(200).json({ message: 'Usuário deletado' });
    } catch (err) {
        return res.status(400).json({ message: 'Não foi possível deletar o usuário', err });
    };
};

module.exports = { index, update, destroy };