import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Modal from '@material-ui/core/Modal';
import Alert from '@material-ui/lab/Alert';

import api from '../services/api';

import '../styles/components/form.css';
import '../styles/components/modal.css';

function Dialog({ isVisible, closeModal, project, userId }) {
    const history = useHistory();

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    async function handleSubmitForm(event) {
        event.preventDefault();

        await api.delete(`/users/${userId}/projects/${project.id}`)
            .then(res => {
                setError('');
                setSuccess(res.data.message);
                history.push('/');
            })
            .catch(err => {
                setSuccess('');
                setError(err.response.data.message);
            });

    };

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
        <Modal
            open={isVisible}
            onClose={closeModal}
            className="modal"
        >
            <div className="dialog delete-dialog">
                <form onSubmit={handleSubmitForm} className="form-content">
                    <h3 className="modal-title">Deseja deletar seu projeto?</h3>
                    <div className="buttons-container delete-project-buttons">
                        <button onClick={closeModal} className="submit-button modal-button cancel-button">Cancelar</button>
                        <button type="submit" className="submit-button modal-button">Confirmar</button>
                    </div>
                </form>
                <div className="alert-container">
                    {renderAlert()}
                </div>
            </div>
        </Modal>
    );
}

export default Dialog;