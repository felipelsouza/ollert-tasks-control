import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

import SideBar from '../components/SideBar';

import api from '../services/api';
import { login } from '../services/auth';

import '../styles/pages/home.css';
import '../styles/components/form.css';

function Home() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    async function handleLogin(event) {
        event.preventDefault();

        await api.post('/auth/login', { email, password })
            .then(user => {
                login(user.data.token, user.data.userId);
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
        <div id="home">
            <SideBar />

            <section>
                <h2 className="section-title">Login</h2>
                <form onSubmit={handleLogin} className="form-content">
                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="text"
                            id="email"
                            autoCorrect="off"
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
                        Entrar
                    </button>
                </form>
                <div className="change-page-container">
                    <span>Ainda não possui uma conta?</span>
                    <Link to="/singup" className="change-page-button">
                        Cadastre-se
                    </Link>
                </div>
            </section>

            <div className="alert-container">
                {renderAlert()}
            </div>
        </div>
    );
};

export default Home;