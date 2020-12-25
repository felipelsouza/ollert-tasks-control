const Task = require('../models/Task');
const Project = require('../models/Project');
const TaskStatus = require('../models/TaskStatus');

const store = async (req, res) => {
    const { user_id, project_id } = req.params;
    const { status, title, description } = req.body;

    try {
        const project = await Project.findByPk(project_id, {
            include: {
                association: 'users',
                where: { id: user_id }
            }
        });

        if (!project) {
            return res.status(400).json({ message: 'Projeto inexistente' });
        }

        const taskStatus = await TaskStatus.findByPk(status);

        if (!taskStatus) {
            return res.status(400).json({ message: 'Status inexistente' });
        }

        if (!title || !description) {
            return res.status(400).json({ message: 'É necessário preencher todos os campos!' });
        }

        const task = await Task.create({
            project_id,
            status_id: status,
            title,
            description
        });

        return res.status(201).json(task);
    } catch (err) {
        return res.status(400).json({ message: 'Erro na criação da tarefa', err });
    }
};

const indexAll = async (req, res) => {
    const { user_id, project_id } = req.params;

    try {
        const tasks = await Project.findByPk(project_id, {
            include: [
                {
                    attributes: [],
                    association: 'users',
                    where: { id: user_id }
                },
                {
                    association: 'tasks',
                    attributes: ['id', 'title', 'description', 'created_at', 'updated_at'],
                    include: { association: 'status' }
                }
            ],
        });

        return res.status(200).json(tasks);
    } catch (err) {
        return res.status(400).json({ message: 'Erro na listagem de tarefas', err });
    }
};

const indexOne = async (req, res) => {
    const { user_id, project_id, task_id } = req.params;

    try {
        const task = await Project.findByPk(project_id, {
            include: [
                {
                    attributes: [],
                    association: 'users',
                    where: { id: user_id }
                },
                {
                    association: 'tasks',
                    attributes: ['id', 'title', 'description', 'created_at', 'updated_at'],
                    where: { id: task_id },
                    include: { association: 'status' }
                }
            ],
        });

        return res.status(200).json(task);
    } catch (err) {
        return res.status(400).json({ message: 'Erro na listagem de tarefas', err });
    }
};

const update = async (req, res) => {
    const { user_id, project_id, task_id } = req.params;
    const { title, description, status } = req.body;

    try {
        const task = await Task.findByPk(task_id, {
            include: [
                {
                    association: 'project',
                    where: { id: project_id },
                    include: {
                        association: 'users',
                        where: { id: user_id },
                        attributes: []
                    }
                }
            ]
        })
            .then(task => task.update({ status_id: status, title, description }))
            .catch(err => res.status(500).json(err));

        return res.status(200).json(task);
    } catch (err) {
        return res.status(400).json({ message: 'Erro na atualização da tarefa', err });
    }
};

const destroy = async (req, res) => {
    const { user_id, project_id, task_id } = req.params;

    try {
        await Task.findByPk(task_id, {
            include: [
                {
                    association: 'project',
                    where: { id: project_id },
                    include: {
                        association: 'users',
                        where: { id: user_id },
                        attributes: []
                    }
                }
            ]
        })
            .then(task => task.destroy())
            .catch(err => res.status(500).json(err));

        return res.status(200).json({ message: 'Tarefa deletada' });
    } catch (err) {
        return res.status(400).json({ message: 'Erro na deletar a tarefa', err });
    }
};

module.exports = { store, indexAll, indexOne, update, destroy };
