const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const id = req.userId

        const user = await User.findByPk(id);

        user.password = undefined;

        return res.json({ user });
    }
};