import React from 'react';
import { useHistory } from 'react-router-dom'

import { logout } from '../services/auth'

function Projects() {
    const history = useHistory();

    function handleLogout() {
        logout();
        history.push('/');
    }

    return (
        <>
            <div>Projetos</div>
            <button onClick={handleLogout}>LOGOUT</button>
        </>
    );
};

export default Projects;