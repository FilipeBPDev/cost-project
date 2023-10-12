import { useLocation } from "react-router-dom";
import Message from "../layout/Message/Message";
import styles from './Projects.module.css';
import Container from "../layout/Container/Container";
import LinkButton from "../layout/LinkButton/LinkButton";

function Projects() {
    const location = useLocation();
    let message = '';
    
    if (location.state) {
        message = location.state.message;
    }

    return (
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" text="visualizar projeto"></LinkButton>
            </div>
            {message && <Message type="sucess" msg={message} />}
            <Container customClass="start">
                <p>Projetos</p>
            </Container>
        </div>
    );
}

export default Projects;