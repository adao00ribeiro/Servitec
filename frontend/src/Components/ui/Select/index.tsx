import { IMaskInput, IMaskInputProps, IMaskMixin } from 'react-imask';
import { IInputProps } from "../../../interfaces/IInputProps"
import styles from './styles.module.scss'
import { InputHTMLAttributes, ReactNode, useCallback, useState } from 'react';
import { IInputMaskProps } from '../../../interfaces/IInputMaskProps';
interface ISelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    children: ReactNode
}
export function Select({ ...props }: ISelectProps) {
    return (
        <select className={styles.select}  {...props} >
            {props.children}
        </select >
    )
}
