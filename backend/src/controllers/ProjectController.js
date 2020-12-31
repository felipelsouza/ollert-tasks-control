const Project = require('../models/Project');
const User = require('../models/User');

const store = async (req, res) => {
    const { user_id } = req.params;
    const { title, description } = req.body;

    try {
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ message: 'Usuário inexistente' });
        }

        if (!title) {
            return res.status(400).json({ message: 'O projeto deve conter um título' });
        }

        const projectName = await Project.findOne({ where: { title } });

        if (projectName) {
            return res.status(401).json({ message: 'Ops.. Já existe um projeto com este nome!' });
        }

        const project = await Project.create({ user_id, title, description });

        return res.status(201).json(project);
    } catch (err) {
        return res.status(400).json({ message: 'Erro na criação do projeto', err });
    }
};

const indexAll = async (req, res) => {
    const { user_id } = req.params;

    try {
        const user = await User.findByPk(user_id, {
            attributes: ['id', 'name', 'email', 'created_at', 'updated_at'],
            include: { association: 'projects' }
        });

        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ message: 'Erro na listagem de projetos', err });
    }
};

const indexOne = async (req, res) => {
    const { user_id, project_id } = req.params;

    try {
        const user = await User.findByPk(user_id, {
            attributes: ['id', 'name', 'email', 'created_at', 'updated_at'],
            include: { association: 'projects', where: { id: project_id } }
        });

        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ message: 'Erro na listagem de projetos', err });
    }
};

const update = async (req, res) => {
    const { user_id, project_id } = req.params;
    const { title, description, editable } = req.body;

    try {
        const project = await Project.findByPk(project_id, {
            include: {
                association: 'users',
                where: { id: user_id },
                attributes: []
            }
        })
            .then(project => project.update({ title, description, editable }))
            .catch(err => res.status(500).json(err));

        return res.status(200).json(project);
    } catch (err) {
        return res.status(400).json({ message: 'Erro na atualização do projeto', err });
    }
};

const destroy = async (req, res) => {
    const { user_id, project_id } = req.params;

    try {
        await Project.findByPk(project_id, {
            include: {
                association: 'users',
                where: { id: user_id },
                attributes: []
            }
        })
            .then(project => project.destroy())
            .catch(err => res.status(500).json(err));

        return res.status(200).json({ message: 'Projeto deletado' });
    } catch (err) {
        return res.status(400).json({ message: 'Erro ao deletar projeto', err });
    }
};

module.exports = { store, indexAll, indexOne, update, destroy };