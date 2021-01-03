import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

import SideBar from '../components/SideBar';

import api from '../services/api';

import '../styles/pages/register.css';
import '../styles/components/form.css';

function Register() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    async function handleSignUp(event) {
        event.preventDefault();

        await api.post('/auth/register', { name, email, password })
            .then(user => {
                setError('');
                setSuccess(user.data.message);
                history.push('/app');
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
        <div id="register">
            <SideBar />

            <section>
                <h2 className="section-title">Cadastro</h2>
                <form onSubmit={handleSignUp} className="form-content">
                    <div className="field">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            maxLength="40"
                            onChange={event => setName(event.target.value)}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="text"
                            id="email"
                            autoCorrect="off"
                            maxLength="40"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="off"
                            autoCorrect="off"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Criar conta
                    </button>
                </form>
                <div className="change-page-container">
                    <span>Já possui uma conta?</span>
                    <Link to="/" className="change-page-button">
                        Faça Login
                    </Link>
                </div>
            </section>

            <div className="alert-container">
                {renderAlert()}
            </div>
        </div>
    );
};

export default Register;