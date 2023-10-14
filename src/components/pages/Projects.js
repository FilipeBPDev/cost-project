import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from './Projects.module.css';

import Message from "../layout/Message/Message";
import Container from "../layout/Container/Container";
import LinkButton from "../layout/LinkButton/LinkButton";
import ProjectCard from "../project/form/Card/ProjectCard";

function Projects() {

    const [projects, setProjects] = useState([]);



    const location = useLocation();
    let message = '';
    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        }).then(resp => resp.json())
            .then(data => {
                setProjects(data)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"></LinkButton>
            </div>
            {message && <Message type="sucess" msg={message} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}

                        />))}
            </Container>
        </div>
    );
}

export default Projects;