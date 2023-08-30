import React from "react"
import styles from "./styles.module.scss"
import { RiCloseFill } from 'react-icons/ri'
import Image from "next/image"
import Button from "../../ui/Button"

interface IModalDetalhePedido {
    IsOpen: boolean
    CloseModal: () => void
}

export function ModalDetalheMesa(Modal: IModalDetalhePedido) {





    return (
        <dialog id="dialogDetalheProcesso" className={styles.modal} open={Modal.IsOpen}>
            <div className={styles.containerModal}>
                <div className={styles.childdivmodal}>
                    <h2>Mesa 1</h2>
                    <RiCloseFill className={styles.close} onClick={Modal.CloseModal} />
                </div>
                <div className={styles.container}>
                    <div className={styles.card}>
                        <span>1 - Pizza frango com catupiry</span>
                        <div className={styles.containerInformacoes}>

                        </div>
                        <div>
                            <span>SUBTOTAL</span>
                            <span>200</span>
                        </div>
                    </div>
                </div>

                <div>
                    <span>Total</span>
                    <span>200</span>
                </div>
                <Button>Concluir Pedido</Button>
            </div>
        </dialog>
    )
}