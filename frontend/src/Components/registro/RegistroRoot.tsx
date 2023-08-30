import { ReactNode } from 'react'
import styles from './../../pages/registrar/styles.module.scss'

interface IRegistroRootProps {
    children: ReactNode
}

export function RegistroRoot({ children }: IRegistroRootProps) {
    return (
        <div className={styles.containerCenter}>
            {children}
        </div>
    )
}