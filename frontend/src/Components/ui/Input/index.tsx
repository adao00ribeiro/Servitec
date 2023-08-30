import { IInputProps } from "../../../interfaces/IInputProps"
import styles from './styles.module.scss'
import { useCallback } from 'react';
import { cep, cnpj, cpf } from './mask';
import { IInputMaskProps } from '../../../interfaces/IInputMaskProps';

export function Input({ ...props }: IInputProps) {
    return (
        <input className={styles.input}  {...props} />
    )
}

export function InputMask({ ...props }: IInputMaskProps) {

    const handleKeyUp = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            if (props.mask === "cep") {
                cep(e);
            }
            if (props.mask === "cpf") {
                cpf(e);
            }
            if (props.mask === "cnpj") {
                cnpj(e);
            }
        },
        [props.mask]
    );

    return (
        <input className={styles.input}  {...props} onKeyUp={handleKeyUp} />
    );
}