import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getUserId } from '../services/auth';
import api from '../services/api';

import Header from '../components/Header';

import { MdAdd } from 'react-icons/md';
import projectImg from '../images/project.svg'

import '../styles/components/pages.css';
import '../styles/pages/projects-list.css';

function ProjectsList() {
    const [name, setName] = useState('');
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const userId = getUserId();

        api.get(`users/${userId}/projects`)
            .then(res => {
                setName(res.data.name);
                setProjects(res.data.projects);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="page-container">
            <Header />
            <div className="wrapper">
                <div className="panel">
                    <h1>Olá, {name}!</h1>
                    <h3>Seus projetos</h3>
                    <div className="projects-container">
                        <div className="project-preview">
                            <Link to='/new-project' className="new-project">
                                <MdAdd size={40} color="#02507e" />
                            </Link>
                            <span className="project-name">Criar novo</span>
                        </div>

                        {projects.map(project => (
                            <Link to={`project/${project.id}`} className="project-preview" key={project.id}>
                                <img src={projectImg} alt="organizing project" className="project-image" />
                                <span className="project-name">{project.title}</span>
                            </Link>
                        ))}

                    </div>
                </div>
                <footer>
                    <a href="https://storyset.com/work" className="link" target="_blank">Illustration by Freepik Storyset</a>
                </footer>
            </div>
        </div >
    );
};

export default ProjectsList;