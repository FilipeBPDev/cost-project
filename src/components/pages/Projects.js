import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from './Projects.module.css';

import Message from "../layout/Message/Message";
import Container from "../layout/Container/Container";
import LinkButton from "../layout/LinkButton/LinkButton";
import ProjectCard from "../project/form/Card/ProjectCard";
import Loading from "../layout/Loading/Loading";

function Projects() {

    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);



    const location = useLocation();
    let message = '';
    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => {
    /*setTimeout ficticio, apenas para atrasar 2 segundos a
    resposta do servidor, para exibição do component Loading.
    - remover quando for subir em um servidor - */        
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            }).then(resp => resp.json())
                .then(data => {
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch(err => console.log(err))
        },1000)
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
                        {!removeLoading && <Loading/>}
                        {removeLoading && projects.length === 0 && (
                            <p>Não há projetos cadastrados!</p>
                        )}
            </Container>
        </div>
    );
}

export default Projects;