import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';

import api from '../services/api';

import '../styles/components/form.css';
import '../styles/components/modal.css';

function Dialog({ isVisible, closeModal, project, setProject, userId, projectId, newTask, task, setTask }) {
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [statusArray, setStatusArray] = useState([{
        id: 1,
        name: 'A fazer'
    }, {
        id: 2,
        name: 'Fazendo'
    }, {
        id: 3,
        name: 'Finalizada'
    }]);
    const [newStatus, setNewStatus] = useState(1);

    useEffect(() => {
        if (project) {
            setNewTitle(project.title);
            setNewDescription(project.description);
        }
        if (task) {
            setNewStatus(task.status)
            setNewTitle(task.title);
            setNewDescription(task.description);
        }
    }, [isVisible]);

    async function handleSubmitForm(event) {
        event.preventDefault();

        if (project) {
            await api.put(`/users/${project.user_id}/projects/${project.id}`, {
                title: newTitle,
                description: newDescription
            })
                .catch(err => console.log(err));

            setProject({ title: newTitle, description: newDescription });
        }

        if (task) {
            await api.put(`/users/${userId}/projects/${task.project_id}/tasks/${task.id}`, {
                title: newTitle,
                description: newDescription
            })
                .catch(err => console.log(err));

            setTask({ status: newStatus, title: newTitle, description: newDescription });
        }

        if (newTask) {
            await api.post(`/users/${userId}/projects/${projectId}/tasks`, {
                status: newStatus,
                title: newTitle,
                description: newDescription
            })
                .catch(err => console.log(err.response.data));

            setTask({
                status: newStatus,
                title: newTitle,
                description: newDescription
            });
        }

        closeModal();
    }

    function setModalTitle() {
        if (project) {
            return 'Editar Projeto';
        }
        if (task) {
            return 'Editar Tarefa';
        }
        return 'Adicionar Tarefa';
    }

    function handleSelectStatus() {
        const status = statusArray.map(status => status);

        if (newTask) {
            return (
                <div className="field">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={newStatus}
                        onChange={event => setNewStatus(event.target.value)}
                        className="select"
                    >
                        {status.map(status =>
                            (<option key={status.id} value={status.id}>{status.name}</option>)
                        )}
                    </select>
                </div>
            );
        }
    }

    return (
        <Modal
            open={isVisible}
            onClose={closeModal}
            className="modal"
        >
            <div className="dialog">
                <form onSubmit={handleSubmitForm} className="form-content">
                    <h3 className="modal-title">{setModalTitle()}</h3>
                    {handleSelectStatus()}
                    <div className="field">
                        <label htmlFor="title">Título</label>
                        <input
                            id="title"
                            type="text"
                            defaultValue={newTitle}
                            maxLength="100"
                            value={newTitle}
                            onChange={event => setNewTitle(event.target.value)}
                            className="modal-input"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            id="description"
                            type="text"
                            defaultValue={newDescription}
                            maxLength="500"
                            value={newDescription}
                            onChange={event => setNewDescription(event.target.value)}
                            className="modal-input"
                        />
                    </div>
                    <div className="buttons-container">
                        <button onClick={closeModal} className="submit-button modal-button cancel-button">Cancelar</button>
                        <button type="submit" className="submit-button modal-button">Salvar</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default Dialog;