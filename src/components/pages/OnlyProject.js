import styles from './OnlyProject.module.css';

import Loading from '../layout/Loading/Loading';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from '../layout/Container/Container';

//resgata o projeto do banco baseado no parametro da url (id)
function OnlyProject() {
    //pega o id do projeto que vem junto a url
    const { id } = useParams()

    const [onlyProject, setOnlyProject] = useState([]);

    //state responsavel por mostrar ou não o projeto
    const [showProjectForm, setShowProjectForm] = useState(false)

    //monitora o id do projeto
    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        }).then(resp => resp.json())
            .then((data) => {
                setOnlyProject(data)
            })
            .catch(err => console.log(err))
    }, [id])

    function toggleProjectForm() {
        //define que o estado será alterado para o inverso do atual
        setShowProjectForm(!showProjectForm)
    }


    return (<>
        {onlyProject.name ? (
            <div className={styles.projectDetails}>
                <Container customClass="column">
                    <div className={styles.detailsContainer}>
                        <h1>Projeto: <span>{onlyProject.name}</span></h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {/*se não tiver a exibição do project form, ele mostra 'editar',
                             senão mostra 'fechar'*/}
                            {!showProjectForm ? 'Editar projeto' : 'Fechar'}

                        </button>
                        {!showProjectForm ? (
                            <div className={styles.projectInfo}>
                                <p>
                                    <span>Categoria: </span> {onlyProject.category.name}
                                </p>
                                <p>
                                    <span>Total do Orçamento: </span> R${onlyProject.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado: </span> R${onlyProject.cost}
                                </p>
                                
                            </div>
                        ) : (
                            <div className={styles.projectInfo}>
                                <p>detalhes do projeto</p>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
    </>)
}

export default OnlyProject;