import Input from '../form/Input/Input';
import Select from '../form/Select/Select';
import SubmitButton from '../form/Submit/SubmitButton';

import { useEffect, useState } from 'react';

import styles from './ProjectForm.module.css';

function ProjectForm({ handleSubmit, btnText, projectData }) {

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || [])

    //request para a api com as categories
    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => console.log(err))
    }, []);
    // as linhas acima são de chamada para o servidor  

    const submit = (e) => {
        e.preventDefault()
        
        handleSubmit(project) //executa o método que é passsado pela props e passa project como paramentro
    }

    //já cria o projeto no banco independente do input preenchido
    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e) {
        setProject({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <div>
                <Input
                    type="text"
                    text="Nome do projeto"
                    name="name"
                    placeholder="Insira o nome do projeto."
                    handleOnChange={handleChange}
                    value={project.name ? project.name : ''}
                />
            </div>
            <div>
                <Input
                    type="number"
                    text="Orçamento do projeto"
                    name="budget"
                    placeholder="Insira o orçamento do projeto."
                    handleOnChange={handleChange}
                    value={project.budget ? project.budget : ''}
                />
            </div>
            <div>
                <Select
                    name="category_id"
                    text="Selecione a categoria"
                    options={categories}
                    handleOnChange={handleCategory}
                    value={project.category ? project.category.id : ''}
                />

            </div>
            <div>
                <SubmitButton text={btnText} />
            </div>
        </form>
    )
}

export default ProjectForm;