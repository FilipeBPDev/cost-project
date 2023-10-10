import { useNavigate } from 'react-router-dom';
import ProjectForm from '../project/ProjectForm/ProjectForm';
import styles from './NewProject.module.css';

function NewProject() {

    //useNavigate permite redirecionar o usuário para outra página
    const history = useNavigate();

    function createPost(project) {
        //initialize cost and services
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                history('/projects', { message: 'Projeto criado com sucesso!' })
                //redirecionar
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.newprojectContainer}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços.</p>
            <ProjectForm
                handleSubmit={createPost}
                btnText="Criar projeto"
            />
        </div>
    )
}

export default NewProject;