import style from './Home.module.css';

import savings from '../../img/savings.svg';
import LinkButton from '../layout/LinkButton/LinkButton';

function Home() {
    return (
        <section className={style.homeContainer}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <div>
                <LinkButton to="/newproject" text="Criar projeto" />
            </div>

            <img src={savings} alt="Costs"></img>
        </section>
    )
}

export default Home;