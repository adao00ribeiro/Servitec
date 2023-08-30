import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import useUser from "../../Store/useUser";
import Button from "../ui/Button";
import Input from "../ui/Input";
import styles from "./styles.module.scss";
import UpdateUser from "../../services/funcoes/UpdateUser";
import Image from "next/image";
import { IUser } from "../../interfaces/IUser";
import GetProfile from "../../services/funcoes/GetProfile";
import useCurrentScreen from "../../Store/useCurrentScreen";
import { ECurrentScreen } from "../../enums/ECurrentScreen";

export default () => {
    const user = useUser(state => state.user)
    const setUser = useUser(state => state.setUser)

    const setcurrentScreen = useCurrentScreen(state => state.setCurrent);

    const [inputUser, setinputUser] = useState({
        ...user,
        password2: "",
        avatarurl: '/avatarui.png',
        imageAvatar: null
    });

    useEffect(() => {

        GetProfile()
            .then((res) => {
                if (res.jobtitle == 'CAIXA') {
                    setcurrentScreen(ECurrentScreen.CAIXA);
                }
                if (res.jobtitle == 'PIZZAIOLO') {
                    setcurrentScreen(ECurrentScreen.PEDIDOS);
                }
                setinputUser({
                    ...inputUser,
                    name: res?.name,
                    email: res?.email,
                    jobtitle: res?.jobtitle,
                    password: res?.password,
                    avatarurl: res.avatarurl != "" ? "http://localhost:3333/" + res.avatarurl : "/avatarui.png",
                });
                setUser(res)
            })
            .catch((erro) => {
                alert(erro.response);
            })
    }, [setUser, setinputUser])

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setinputUser({ ...inputUser, [name]: value });
    }
    const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }
        const image = event.target.files[0];
        if (!image) {
            return;
        }
        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setinputUser({
                ...inputUser,
                avatarurl: URL.createObjectURL(event.target.files[0]),
                imageAvatar: image
            })
        }
    }

    const handleAtualizar = useCallback(async (event: FormEvent) => {

        event.preventDefault();
        UpdateUser({
            name: inputUser.name,
            email: inputUser.email,
            jobtitle: inputUser.jobtitle,
            password: inputUser.password,
            avatarurl: inputUser.avatarurl,
            imageAvatar: inputUser.imageAvatar
        });
    }, []);

    return (
        <div className={styles.perfil}>
            <h1>Perfil</h1>
            <form className={styles.form} onSubmit={handleAtualizar}>
                <label className={styles.labelAvatar}>
                    <input type="file" name='inputFile' accept="image/png, image/jpeg" onChange={handleFile} />
                    <div>
                        <Image
                            src={inputUser.avatarurl}
                            className={styles.preview}
                            alt="Avatar Usuario"
                            fill
                            sizes="(max-width: 768px) 100vw"
                        />
                    </div>

                </label>
                <Input
                    name="name"
                    type="text"
                    value={inputUser.name}
                    placeholder="name"
                    onChange={handleInput}
                />
                <Input
                    name="email"
                    type="email"
                    value={inputUser.email}
                    placeholder="email"
                    onChange={handleInput}
                />
                <Input
                    name="jobtitle"
                    type="text"
                    value={inputUser.jobtitle}
                    placeholder="job" disabled
                    onChange={handleInput}
                />
                <Input
                    name="password"
                    type="password"
                    value={inputUser.password}
                    placeholder="senha"
                    onChange={handleInput}
                />
                <Input
                    name="password2"
                    type="password"
                    value={inputUser.password2}
                    placeholder="senha"
                    onChange={handleInput}
                />
                <Button type="submit">Atualizar</Button>
            </form>
        </div>
    )
}