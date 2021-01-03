import React from 'react';

import logoImg from '../images/logo.svg';

import '../styles/components/side-bar.css';

function SideBar() {
    return (
        <aside>
            <div className="aside-content">
                <a href="https://storyset.com/work" target="_blank" rel="noreferrer">Illustration by Freepik Storyset</a>
                <img src={logoImg} alt="ollert" className="logo" />
                <h2>O Ollert te ajuda a organizar suas tarefas e projetos, trazendo mais produtividade para o seu dia-a-dia</h2>
            </div>
        </aside>
    );
};

export default SideBar;