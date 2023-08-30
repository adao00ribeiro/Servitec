import styles from "./styles.module.scss";
import { FaBars } from 'react-icons/fa'
import Image from "next/image";
import useSideBar from "../../Store/useSideBar";
import PerfilOption from "../PerfilOption";
import { useEffect, useRef, useState } from "react";
import useUser from "../../Store/useUser";

export function Header() {

    const [IsOption, setIsOption] = useState(false);
    const containerRef = useRef(null);

    const user = useUser(state => state.user);
    const isactive = useSideBar(state => state.IsActive);
    const setIsActive = useSideBar(state => state.setIsActive);
    const urlimg = user.avatarurl != "" ? "http://localhost:3333/" + user.avatarurl : "/avatarui.png";

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOption(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const showNavbar = () => {
        if (user?.jobtitle != "ADMIN") {
            return;
        }
        setIsActive(!isactive)
    }

    const handlePerfilOption = () => {
        setIsOption(!IsOption);
    }
    return (
        < header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.headerLeft}>
                    <button className={styles.btnHamburguer} onClick={showNavbar}>
                        <FaBars size={40}></FaBars>
                    </button>
                    <span >
                        Servitec
                    </span>

                </div>
                <div className={styles.containerRight}>
                    <div>
                        <span>Adao ribeiro correia</span>

                    </div>
                    <div ref={containerRef} className={styles.containerAvatar} onClick={handlePerfilOption} >

                        <Image
                            src={urlimg}
                            fill
                            alt={""}
                            sizes="(max-width: 768px) 100vw"
                        ></Image>
                        {IsOption &&
                            <PerfilOption></PerfilOption>
                        }
                    </div>
                </div>
            </div>

        </header >
    )
}