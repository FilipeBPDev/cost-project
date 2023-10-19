import { useState } from 'react';
import Input from '../../project/form/Input/Input';
import SubmitButton from '../../project/form/Submit/SubmitButton';

//reaproveitando css do ProjectForm
import styles from '../../project/ProjectForm/ProjectForm.module.css';

function ServiceForm({ handleSubmit, btnText, projectData }) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        /*o .push() adiciona "service" dentro de "services", nos dados 
        do projeto. Manipula os dados do projeto adicionando os serviços 
        e depois envia para OnlyProject através do handleSubmit*/
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        /*setService define que dentro do objeto service, a propriedade "name"do 
        input em questão, será definida pela propriedade value do input em questão*/
        setService({...service, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do serviço"
                name="name"
                placeholder="Insira o nome do serviço "
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder="Insira valor total "
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Descrição do serviço"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ServiceForm;