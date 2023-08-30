
import useCurrentScreen from "../../Store/useCurrentScreen";
import { ECurrentScreen } from "../../enums/ECurrentScreen";
import SignOut from "../../services/Sign/SignOut";
import Button from "../ui/Button";
import styles from "./styles.module.scss";
export default () => {
    const setcurrentScreen = useCurrentScreen(state => state.setCurrent);
    return (
        <div className={styles.container}>
            <Button onClick={() => { setcurrentScreen(ECurrentScreen.PERFIL) }}>Perfil</Button>
            <Button onClick={SignOut}>Sair</Button>
        </div>
    )
}