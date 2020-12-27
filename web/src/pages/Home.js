import React from 'react';

import { Link } from 'react-router-dom'

import SideBar from '../components/SideBar';

import '../styles/pages/home.css';
import '../styles/components/form.css';

function Home() {
    return (
        <div id="home">
            <SideBar />

            <section>
                <h2 className="section-title">Login</h2>
                <form onSubmit="" className="form-content">
                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input type="text" id="email" />
                    </div>

                    <div className="field">
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" />
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
        </div>
    );
};

export default Home;