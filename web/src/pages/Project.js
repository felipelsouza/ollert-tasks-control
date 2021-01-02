import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '../services/api';
import { getUserId } from '../services/auth';

import Header from '../components/Header';

import { MdAdd, MdEdit, MdDelete, MdNavigateNext } from 'react-icons/md';

import '../styles/pages/project.css';

function Project() {
    const params = useParams();

    const userId = getUserId();

    const [project, setProject] = useState([]);
    const [toDoTasks, setToDoTasks] = useState([]);
    const [doingTasks, setDoingTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

    useEffect(() => {
        api.get(`/users/${userId}/projects/${params.id}`)
            .then(project => setProject(project.data))
            .catch(err => console.log(err));
    }, [params.id]);

    useEffect(async () => {
        const tasks = await api.get(`/users/${userId}/projects/${params.id}/tasks`)
            .then(tasks => tasks.data)
            .catch(err => console.log(err));

        const toDo = await tasks.filter(task => task.status_id === 1);
        const doing = await tasks.filter(task => task.status_id === 2);
        const done = await tasks.filter(task => task.status_id === 3);

        console.log(tasks);

        setToDoTasks(toDo);
        setDoingTasks(doing);
        setDoneTasks(done);
    }, []);

    return (
        <div className="project">
            <Header />
            <div className="project-wrapper">
                <div className="title-container">
                    <span className="project-title">
                        {project.title}
                    </span>
                    <button className="edit-project-button">
                        <MdEdit size={18} color="#3a3a3a" />
                    </button>
                </div>
                <p className="project-description">
                    {project.description}
                </p>
                <div className="tasks-container">
                    <div className="tasks-section">
                        <div className="task-status">
                            <span className="status-title">A fazer</span>
                            <button className="add-task-button">
                                <MdAdd size={20} color="#02507e" />
                            </button>
                        </div>

                        {toDoTasks.map(task => (
                            <div className="task-card" key={task.id}>
                                <div className="task-header">
                                    <span className="task-title">{task.title}</span>
                                    <div className="task-options">
                                        <button className="task-option-button">
                                            <MdEdit size={16} color="#3a3a3a" />
                                        </button>
                                        <button className="task-option-button">
                                            <MdDelete size={16} color="#d91e18" />
                                        </button>
                                        <button className="task-option-button">
                                            <MdNavigateNext size={16} color="#019875" />
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
                            <button className="add-task-button">
                                <MdAdd size={20} color="#02507e" />
                            </button>
                        </div>

                        {doingTasks.map(task => (
                            <div className="task-card" key={task.id}>
                                <div className="task-header">
                                    <span className="task-title">{task.title}</span>
                                    <div className="task-options">
                                        <button className="task-option-button">
                                            <MdEdit size={16} color="#3a3a3a" />
                                        </button>
                                        <button className="task-option-button">
                                            <MdDelete size={16} color="#d91e18" />
                                        </button>
                                        <button className="task-option-button">
                                            <MdNavigateNext size={16} color="#019875" />
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
                            <button className="add-task-button">
                                <MdAdd size={20} color="#02507e" />
                            </button>
                        </div>

                        {doneTasks.map(task => (
                            <div className="task-card" key={task.id}>
                                <div className="task-header">
                                    <span className="task-title">{task.title}</span>
                                    <div className="task-options">
                                        <button className="task-option-button">
                                            <MdEdit size={16} color="#3a3a3a" />
                                        </button>
                                        <button className="task-option-button">
                                            <MdDelete size={16} color="#d91e18" />
                                        </button>
                                        <button className="task-option-button">
                                            <MdNavigateNext size={16} color="#019875" />
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