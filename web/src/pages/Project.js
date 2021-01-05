import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '../services/api';
import { getUserId } from '../services/auth';

import Header from '../components/Header';
import Modal from '../components/Modal';
import DeleteProjectModal from '../components/DeleteProjectModal';

import { MdAdd, MdEdit, MdDelete, MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

import '../styles/pages/project.css';

function Project() {
    const params = useParams();

    const userId = getUserId();

    const [project, setProject] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [toDoTasks, setToDoTasks] = useState([]);
    const [doingTasks, setDoingTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [showProjectDialog, setShowProjectDialog] = useState(false);
    const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
    const [showEditTaskDialog, setShowEditTaskDialog] = useState(false);
    const [showDeleteProjectDialog, setShowDeleteProjectDialog] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    useEffect(async () => {
        await api.get(`/users/${userId}/projects/${params.id}`)
            .then(project => setProject(project.data))
            .catch(err => console.log(err));
    }, [project.title, project.description]);

    useEffect(async () => {
        const tasks = await api.get(`/users/${userId}/projects/${params.id}/tasks`)
            .then(tasks => tasks.data)
            .catch(err => console.log(err));

        setTasks(tasks);

        const toDo = await tasks.filter(task => task.status_id === 1);
        const doing = await tasks.filter(task => task.status_id === 2);
        const done = await tasks.filter(task => task.status_id === 3);

        setToDoTasks(toDo);
        setDoingTasks(doing);
        setDoneTasks(done);
    }, [tasks.status_id, tasks.title, tasks.description]);

    function openModal(modalNumber, task) {
        switch (modalNumber) {
            case 1:
                setShowProjectDialog(true);
                break;

            case 2:
                setShowNewTaskDialog(true);
                break;

            case 3:
                setTaskToEdit(task);
                setShowEditTaskDialog(true);
                break;

            default:
                break;
        }
    };

    function closeModal() {
        setShowProjectDialog(false);
        setShowNewTaskDialog(false);
        setShowEditTaskDialog(false);
        setShowDeleteProjectDialog(false);
    };

    async function handleChangeStatus(task, direction) {
        switch (task.status_id) {
            case 1:
                if (direction === -1)
                    await updateTaskStatus(task, 3);
                if (direction === 1)
                    await updateTaskStatus(task, 2);
                break;

            case 2:
                if (direction === -1)
                    await updateTaskStatus(task, 1);
                if (direction === 1)
                    await updateTaskStatus(task, 3);
                break;

            case 3:
                if (direction === -1)
                    await updateTaskStatus(task, 2);
                if (direction === 1)
                    await updateTaskStatus(task, 1);
                break;

            default:
                break;
        }
    }

    async function updateTaskStatus(task, newStatus) {
        await api.put(`/users/${userId}/projects/${task.project_id}/tasks/${task.id}`, { status: newStatus })
            .then(res => setTasks(res.data))
            .catch(err => console.log(err));
    }

    async function handleDeleteTask(task) {
        await api.delete(`/users/${userId}/projects/${task.project_id}/tasks/${task.id}`)
            .then(() => setTasks({ status_id: 0 }))
            .catch(err => console.log(err));
    };

    return (
        <div className="project">
            <Header />
            <div className="project-wrapper">
                <Modal
                    isVisible={showProjectDialog}
                    closeModal={closeModal}
                    setProject={setProject}
                    project={project}
                />
                <Modal
                    isVisible={showNewTaskDialog}
                    closeModal={closeModal}
                    setTask={setTasks}
                    userId={userId}
                    projectId={params.id}
                    newTask
                />
                <Modal
                    isVisible={showEditTaskDialog}
                    closeModal={closeModal}
                    setTask={setTasks}
                    task={taskToEdit}
                    userId={userId}
                />

                <DeleteProjectModal
                    isVisible={showDeleteProjectDialog}
                    closeModal={closeModal}
                    project={project}
                    userId={userId}
                />
                <div className="sub-header">
                    <button onClick={() => openModal(2)} className="add-task-button">
                        Nova Tarefa &nbsp;
                    <div className="add-icon">
                            <MdAdd size={32} color="#FFFFFF" />
                        </div>
                    </button>

                    <div className="title-container">
                        <span className="project-title">
                            {project.title}
                        </span>
                        <div className="project-description-container">
                            <p className="project-description">
                                {project.description}
                            </p>
                            <button onClick={() => openModal(1)} className="edit-project-button">
                                <MdEdit size={18} color="#3a3a3a" />
                            </button>
                        </div>
                    </div>

                    <button onClick={() => setShowDeleteProjectDialog(true)} className="delete-project-button">
                        Deletar Projeto &nbsp;
                    <div className="delete-icon">
                            <MdDelete size={32} color="#FFFFFF" />
                        </div>
                    </button>
                </div>

                <div className="tasks-container">
                    <div className="tasks-section">
                        <div className="task-status">
                            <span className="status-title">A fazer</span>
                        </div>

                        {toDoTasks.map(task => (
                            <div className="task-card" key={task.id}>
                                <div className="task-header">
                                    <span className="task-title">{task.title}</span>
                                    <div className="task-options">
                                        <button onClick={() => handleChangeStatus(task, -1)} className="task-option-button">
                                            <MdNavigateBefore size={16} color="#019875" />
                                        </button>
                                        <button onClick={() => handleChangeStatus(task, 1)} className="task-option-button">
                                            <MdNavigateNext size={16} color="#019875" />
                                        </button>
                                        <button onClick={() => openModal(3, task)} className="task-option-button">
                                            <MdEdit size={16} color="#3a3a3a" />
                                        </button>
                                        <button onClick={() => handleDeleteTask(task)} className="task-option-button">
                                            <MdDelete size={16} color="#d91e18" />
                                        </button>
                                    </div>
                                </div>
                                <p className="task-description">{task.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="tasks-section">
                        <div className="task-status">
                            <span className="status-title">Em andamento</span>
                        </div>

                        {doingTasks.map(task => (
                            <div className="task-card" key={task.id}>
                                <div className="task-header">
                                    <span className="task-title">{task.title}</span>
                                    <div className="task-options">
                                        <button onClick={() => handleChangeStatus(task, -1)} className="task-option-button">
                                            <MdNavigateBefore size={16} color="#019875" />
                                        </button>
                                        <button onClick={() => handleChangeStatus(task, 1)} className="task-option-button">
                                            <MdNavigateNext size={16} color="#019875" />
                                        </button>
                                        <button onClick={() => openModal(3, task)} className="task-option-button">
                                            <MdEdit size={16} color="#3a3a3a" />
                                        </button>
                                        <button onClick={() => handleDeleteTask(task)} className="task-option-button">
                                            <MdDelete size={16} color="#d91e18" />
                                        </button>
                                    </div>
                                </div>
                                <p className="task-description">{task.description}</p>
                            </div>
                        ))}

                    </div>

                    <div className="tasks-section">
                        <div className="task-status">
                            <span className="status-title">Finalizadas</span>
                        </div>

                        {doneTasks.map(task => (
                            <div className="task-card" key={task.id}>
                                <div className="task-header">
                                    <span className="task-title">{task.title}</span>
                                    <div className="task-options">
                                        <button onClick={() => handleChangeStatus(task, -1)} className="task-option-button">
                                            <MdNavigateBefore size={16} color="#019875" />
                                        </button>
                                        <button onClick={() => handleChangeStatus(task, 1)} className="task-option-button">
                                            <MdNavigateNext size={16} color="#019875" />
                                        </button>
                                        <button onClick={() => openModal(3, task)} className="task-option-button">
                                            <MdEdit size={16} color="#3a3a3a" />
                                        </button>
                                        <button onClick={() => handleDeleteTask(task)} className="task-option-button">
                                            <MdDelete size={16} color="#d91e18" />
                                        </button>
                                    </div>
                                </div>
                                <p className="task-description">{task.description}</p>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Project;