import { ChangeEvent, FormEvent } from 'react';
import styles from './../../pages/registrar/styles.module.scss'
import Link from 'next/link'
import Input from '../ui/Input';
import Button from '../ui/Button';

interface IRegistroContentProps {
    inputs: any;
    handleSubmit: (event: FormEvent) => void;
    handleInputs: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function RegistroContent({ inputs, handleSubmit, handleInputs }: IRegistroContentProps) {
    return (
        <div className={styles.login}>
            <h1>Cadastre-se</h1>
            <form onSubmit={handleSubmit}>
                <Input type="text" value={inputs.name} onChange={handleInputs} name="name" placeholder='Seu nome'></Input>
                <Input type="email" value={inputs.email} onChange={handleInputs} name="email" placeholder='Seu email'></Input>
                <Input type="password" value={inputs.password1} onChange={handleInputs} name="password1" placeholder='Sua senha'></Input>
                <Input type="password" value={inputs.password2} onChange={handleInputs} name="password2" placeholder='Sua senha'></Input>
                <Button type='submit'> Cadastrar</Button>
            </form>
            <Link href={'/'}> Já possuo uma conta</Link>
        </div>
    )
}