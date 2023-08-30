import Head from 'next/head'
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { Registro } from '../../Components/registro'
import Image from 'next/image';
import styles from './styles.module.scss'

export default function Registrar() {

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password1: "",
        password2: ""
    });
    const [loading, setLoading] = useState(false)

    const handleInputs = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name == 'password2') {
            if (value == inputs.password1) {
                console.log("igual")
            } else {
                console.log("diferente")
            }
        }
        setInputs({ ...inputs, [name]: value })
    }
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (inputs.name == "" || inputs.email == "" || inputs.password1 == "" || inputs.password2 == "") {
            alert("Preencha todos os campos")
            return;
        }
        setLoading(true);

        setLoading(false);
    }
    return (
        <>
            <Head>
                <title>Cadastrar</title>
                <meta name="description" content="A software to assist secretaries in organizing tasks and information." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Registro.Root>
                <Image src="/FatiaPizza.svg" alt='Logo Secretary Helper' width={150} height={150} />
                <Registro.Content inputs={inputs} handleInputs={handleInputs} handleSubmit={handleSubmit} />
            </Registro.Root>
        </>
    )
}
