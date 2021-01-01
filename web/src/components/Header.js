import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { logout } from '../services/auth';

import { MdExitToApp, MdAccountCircle } from 'react-icons/md';
import logoImg from '../images/logo.svg';

import '../styles/components/header.css';

function Header() {
    const history = useHistory();

    function handleLogout() {
        logout();
        history.go(0);
    };

    return (
        <header>
            <nav>
                <Link to="/app">
                    <img src={logoImg} alt="home" className="logo" />
                </Link>
                <div className="options">
                    <Link to='/profile' className="options-button">
                        <MdAccountCircle size={26} color="#ffffff" />
                    </Link>
                    <button onClick={handleLogout} className="options-button">
                        <MdExitToApp size={26} color="#ffffff" />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
