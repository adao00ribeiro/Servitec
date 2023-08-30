import { MutableRefObject, createRef, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { FiLogOut } from 'react-icons/fi'
import useCurrentScreen from "../../Store/useCurrentScreen";
import { ECurrentScreen } from "../../enums/ECurrentScreen";
import useSideBar from "../../Store/useSideBar";


export function SideBar() {
    const isactive = useSideBar(state => state.IsActive);
    const [opcoes, setopcoes] = useState(false);
    const setcurrent = useCurrentScreen(state => state.setCurrent)
    const divRefArquivos = useRef<HTMLDivElement>();
    const divRefUtilitarios = useRef<HTMLDivElement>();
    const mostrarOpcoes = (divRef: MutableRefObject<HTMLDivElement>) => {
        divRef.current.classList.toggle(styles.opcoesvisible)

    }
    const handleClick = useCallback((newcurrent: ECurrentScreen) => {
        setopcoes(false);
        setcurrent(newcurrent)
    }, [setopcoes, setcurrent])
    return (
        < aside className={isactive ? styles.side : styles.sidehidden}  >
            <nav className={styles.nav}>
                <div>
                    <a onClick={() => {
                        mostrarOpcoes(divRefArquivos)
                    }}>
                        Arquivo
                    </a>
                    <div
                        className={styles.opcoes}
                        ref={divRefArquivos}
                    >
                        <Link
                            onClick={() => { handleClick(ECurrentScreen.CADASTROEMPRESA); }} href={""}>
                            Empresa
                        </Link>

                        <Link
                            onClick={() => { handleClick(ECurrentScreen.CADASTROPESSOA); }} href={""}>
                            Pessoa
                        </Link>
                        <Link
                            onClick={() => { handleClick(ECurrentScreen.CADASTROCONTRATOLOCACAO); }}
                            href={""}>
                            Contrato Locacao
                        </Link>

                    </div>

                </div>

                <a >
                    Processos
                </a>
                <a >
                    Relatorio
                </a>
                <div>
                    <a onClick={() => {
                        mostrarOpcoes(divRefUtilitarios)
                    }}>
                        Utilitario
                    </a>
                    <div
                        ref={divRefUtilitarios}
                        className={styles.opcoes}
                    >
                        <Link
                            onClick={() => { handleClick(ECurrentScreen.MESCLARPDFS); }} href={""}>
                            Mesclar Pdfs
                        </Link>
                    </div>
                </div>
            </nav>
        </aside >
    )
}
