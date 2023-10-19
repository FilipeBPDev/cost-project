import styles from './OnlyProject.module.css';


import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { parse, v4 as uuidv4 } from 'uuid';

import Container from '../layout/Container/Container';
import Message from '../layout/Message/Message';
import Loading from '../layout/Loading/Loading';
import ProjectForm from '../project/ProjectForm/ProjectForm';
import ServiceForm from '../service/ServiceForm/ServiceForm';
import ServiceCard from '../service/ServiceCard/ServiceCard';




//resgata o projeto do banco baseado no parametro da url (id)
function OnlyProject() {
    //pega o id do projeto que vem junto a url
    const { id } = useParams()
    const [onlyProject, setOnlyProject] = useState([]);
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    const [services, setServices] = useState([])

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
                setServices(data.services)
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

    function createService(project) {
        setMessage('')

        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost;

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //validar custo do serviço
        if (newCost > parseFloat(project.budget)) {
            setMessage("Orçamento ultrapassado, verifique o valor do serviço")
            setType("error")
            //remover esse serviço do objeto do projeto
            project.services.pop()
            return false
        }
        //adicionar custo do serviço ao custo(cost) do projeto
        project.cost = newCost

        //atualizar no project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then(resp => resp.json())
            .then((data) => {
                setShowServiceForm(false)
                
            })

            .catch(err => console.log(err))
    }

    function removeService() {

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
                                <ServiceForm
                                    handleSubmit={createService}
                                    btnText="Adicionar serviço"
                                    projectData={onlyProject}
                                />
                            )}
                        </div>
                    </div>
                    <h2>Serviços:</h2>
                    <Container customClass="start">

                        {services.length > 0 &&
                        /*não usar as chaves depois da arrowfunction, pois como
                        retorna um jsx, é necessário diretamente os parenteses()*/
                            services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                )
                            )
                        }
                        {services.length === 0 && <p>não há nada aqui</p>}
                    </Container>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
    </>)
}

export default OnlyProject;