import styles from './Container.module.css';

function Container(props) {
    return (
        /*as chaves executam o JS dentro do JSX, a interpolação é para 
        inserir várias classes dentro do className, porém usando javascrip 
        por causa do CSS módules*/
        <div className={`${styles.container} ${styles[props.customClass]}`}> 
            {props.children}
        </div>
    )
}

export default Container;