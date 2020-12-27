import React from 'react';
import { Link } from 'react-router-dom';

import SideBar from '../components/SideBar';

import '../styles/pages/register.css';
import '../styles/components/form.css';

function Register() {
    return (
        <div id="register">
            <SideBar />

            <section>
                <h2 className="section-title">Cadastro</h2>
                <form onSubmit="" className="form-content">
                    <div className="field">
                        <label htmlFor="name">Nome</label>
                        <input type="text" id="name" />
                    </div>

                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input type="text" id="email" />
                    </div>

                    <div className="field">
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" />
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
        </div>
    );
};

export default Register;