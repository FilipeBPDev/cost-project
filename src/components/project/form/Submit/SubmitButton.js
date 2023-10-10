import styles from './SubmitButton.module.css';

function SubmitButton({ text }) {
    return (
        <div className={styles.btn}>
            <button>{text}</button>
        </div>
    )
}

export default SubmitButton;