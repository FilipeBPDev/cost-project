import Input from '../form/Input/Input';
import Select from '../form/Select/Select';
import SubmitButton from '../form/Submit/SubmitButton';

import { useEffect, useState } from 'react';

import styles from './ProjectForm.module.css';

function ProjectForm({ btnText }) {

    const [categories, setCategories] = useState([]);

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

    return (
        <form className={styles.form}>
            <div>
                <Input
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto."
                />
            </div>
            <div>
            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento do projeto."
                />
            </div>
            <div>
                <Select 
                name="category_id" 
                text="Selecione a categoria"
                options={categories}/>
            </div>
            <div>
                <SubmitButton text={btnText}/>
            </div>
        </form>
    )
}

export default ProjectForm;