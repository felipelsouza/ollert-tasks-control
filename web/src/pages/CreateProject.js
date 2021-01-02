import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

import { getUserId } from '../services/auth';
import api from '../services/api';

import Header from '../components/Header';

import '../styles/components/pages.css';
import '../styles/components/form.css';
import '../styles/pages/create-project.css';

function CreateProject() {
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    async function handleCreateProject(event) {
        event.preventDefault();
        const userId = getUserId();

        await api.post(`/users/${userId}/projects`, { title, description })
            .then(project => {
                setError('');
                setSuccess(project.data.message);
                history.push(`project/${project.data.id}`);
            })
            .catch(err => {
                setSuccess('');
                setError(err.response.data.message);
            });
    }

    function renderAlert() {
        if (error) {
            return (
                <Alert variant="filled" severity="error">
                    {error}
                </Alert>
            );
        }
        if (success) {
            return (
                <Alert variant="filled" severity="success">
                    {success}
                </Alert>
            );
        }
    };

    return (
        <div className="page-container">
            <Header />
            <div className="wrapper">
                <div className="panel">
                    <h1>Novo Projeto</h1>
                    <form onSubmit={handleCreateProject} className="project-form">
                        <div className="field title-field">
                            <label htmlFor="title">Título</label>
                            <input
                                id="title"
                                type="text"
                                maxLength="100"
                                value={title}
                                onChange={event => setTitle(event.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="description">Descrição</label>
                            <textarea
                                id="description"
                                type="text"
                                maxLength="500"
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                            />
                        </div>
                        <button type="submit" className="submit-button create">
                            Criar
                        </button>
                        <div className="alert-container">
                            {renderAlert()}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProject;