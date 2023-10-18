import styles from './OnlyProject.module.css';

import Loading from '../layout/Loading/Loading';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from '../layout/Container/Container';
import Message from '../layout/Message/Message';

import ProjectForm from '../project/ProjectForm/ProjectForm';


//resgata o projeto do banco baseado no parametro da url (id)
function OnlyProject() {
    //pega o id do projeto que vem junto a url
    const { id } = useParams()
    const [onlyProject, setOnlyProject] = useState([]);
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    //state responsavel por mostrar ou não o projeto
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)

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

    function editPost(onlyProject) {
        setMessage('')

        //budget validatio
        if (onlyProject.budget < onlyProject.cost) {
            setMessage('O custo do projeto deve ser menor do que o orçamento')
            setType('error')
            return false //para a edição do projeto
        }
        fetch(`http://localhost:5000/projects/${onlyProject.id}`, {
            method: 'PATCH',
            //headers comunica em json com a api
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(onlyProject), //envia os dados
        })
            .then(resp => resp.json())
            .then((data) => {
                setOnlyProject(data)
                setShowProjectForm(false)
                setMessage('Projeto atualizado com sucesso!')
                setType('sucess')

            })
            .catch(err => console.log(err))

    }

    function toggleProjectForm() {
        //define que o estado será alterado para o inverso do atual
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    return (<>
        {onlyProject.name ? (
            <div className={styles.projectDetails}>
                <Container customClass="column">

                    {/*se tiver algo em message pelo setMessage, ele exibe o component Message  */}
                    {message && <Message type={type} msg={message} />}
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
                                <ProjectForm
                                    handleSubmit={editPost}
                                    btnText={"Concluir edição"}
                                    projectData={onlyProject}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.serviceFormContainer}>
                            <h2>Adicione um serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                            {/*se não tiver a exibição do project form, ele mostra 'editar',
                             senão mostra 'fechar'*/}
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                        </button>
                        <div className={styles.projectInfo}>
                             {showServiceForm && (
                                <div>formulario serviço</div>
                             )}
                        </div>
                    </div>
                    <h2>Serviços:</h2>
                        <Container customClass="start">
                                <p>Itens serviços</p>
                        </Container>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
    </>)
}

export default OnlyProject;