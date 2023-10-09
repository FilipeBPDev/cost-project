import ProjectForm from '../project/ProjectForm/ProjectForm';
import styles from './NewProject.module.css';

function NewProject() {
    return (
        <div className={styles.newprojectContainer}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços.</p>
            <ProjectForm btnText="Criar projeto" />
        </div>
    )
}

export default NewProject;