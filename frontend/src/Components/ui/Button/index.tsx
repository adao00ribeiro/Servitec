import { IButtonProps } from "../../../interfaces/IButtonProps"
import styles from "./styles.module.scss";
export default (props: IButtonProps) => {
    return (
        <button
            {...props}
            className={styles.button}
        >
            {props.children}
        </button>
    )
}