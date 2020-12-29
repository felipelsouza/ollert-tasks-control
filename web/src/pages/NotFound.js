import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/not-found.css';

function NotFound() {
    return (
        <div className="container">
            <Link to="/" className="button">
                Página inicial
            </Link>
            <a href="https://storyset.com/web" target="_blank" className="link">Illustration by Freepik Storyset</a>
        </div>
    );
}

export default NotFound;