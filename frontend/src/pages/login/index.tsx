import Head from 'next/head'
import Image from 'next/image'
import styles from './styles.module.scss'
import Button from '../../Components/ui/Button'
import Input from '../../Components/ui/Input'
import { canSSRGuest } from '../../utils/canSSRGuest'
import { ChangeEvent, FormEvent, useState } from 'react'
import { SignIn } from './../../services/Sign/SignIn'
import useUser from '../../Store/useUser'
import { toast } from 'react-toastify'


export default function Login() {
    const setToken = useUser(state => state.setToken)
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)


    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        if (inputs.email === "" || inputs.password === "") {
            toast.warning("Preencha os campos!")
            return
        }
        setLoading(true);
        await SignIn({ email: inputs.email, password: inputs.password }, setToken);
        setLoading(false);
    }
    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    }

    return (
        <>
            <Head>
                <title>Acessar</title>
                <meta name="description" content=" app delicia de fatia" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.containerCenter}>
                <Image src="/FatiaPizza.svg" alt='Logo Fatia de Pizza' width={200} height={200} />
                <div className={styles.containerLogin}>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <Input
                            value={inputs.email}
                            type="email"
                            name='email'
                            placeholder='Seu email'
                            onChange={handleInput}
                        />

                        <Input
                            value={inputs.password}
                            type="password"
                            name='password'
                            placeholder='Sua senha'
                            onChange={handleInput}
                        />

                        <Button type='submit' disabled={loading}>Acessar</Button>
                    </form>
                    {
                        //  <Link href={'/registrar'}> Não possui uma conta? Cadastre-se</Link>
                    }
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
    return {
        props: {}
    }
})