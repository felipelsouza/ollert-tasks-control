import React, { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';

import { getUserId } from '../services/auth';
import api from '../services/api';

import Header from '../components/Header';

import '../styles/components/pages.css';
import '../styles/components/form.css';
import '../styles/pages/profile.css';

function Profile() {
    const userId = getUserId();

    const [profile, setProfile] = useState([]);
    const [name, setName] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(async () => {
        await api.get(`/users/${userId}`)
            .then(user => {
                setError('');
                setSuccess(user.data.message);
                setProfile(user.data);
                setName(user.data.name);
            })
            .catch(err => {
                setSuccess('');
                setError(err.response.data.message);
            });
    }, [profile.id])

    async function handleChangeProfile(event) {
        event.preventDefault();

        await api.put(`/users/${userId}/`, { name })
            .then(res => {
                setError('');
                setSuccess(res.data.message);
                setProfile({ id: res.data.id });
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
        <div className="page-container">
            <Header />
            <div className="wrapper">
                <div className="panel">
                    <h1>Seu Perfil</h1>
                    <form onSubmit={handleChangeProfile} className="profile-form">
                        <div className="field">
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                type="text"
                                defaultValue={name}
                                maxLength="40"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </div>
                        <button type="submit" className="submit-button create">
                            Salvar
                        </button>
                        <div className="alert-container">
                            {renderAlert()}
                        </div>
                        <div className="date-container">
                            <span className="date-span">Criado em: {moment(profile.created_at).locale('pt-br').format('DD/MM/YYYY')}</span>
                            <span className="date-span">Atualizado em: {moment(profile.updated_at).locale('pt-br').format('DD/MM/YYYY')}</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;