import styles from './OnlyProject.module.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

    //resgata o projeto do banco baseado no parametro da url (id)
function OnlyProject() {
    //pega o id do projeto que vem junto a url
    const { id } = useParams()

    const [onlyProject, setOnlyProject] = useState([]);

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
    
        
    
    return (
        <p>{onlyProject.name}</p>
    )
}

export default OnlyProject;