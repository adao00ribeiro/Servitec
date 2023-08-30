import React from "react"
import styles from "./styles.module.scss"
import { RiCloseFill } from 'react-icons/ri'
import Image from "next/image"
import Button from "../../ui/Button"
import { IOrder } from "../../../interfaces/IOrder"

interface IModalDetalhePedido {

    order: IOrder;
    IsOpen: boolean;
    CloseModal: () => void;
}

export function ModalDetalhePedido(props: IModalDetalhePedido) {


    return (
        <dialog id="dialogDetalheProcesso" className={styles.modal} open={props.IsOpen}>
            <div className={styles.containerModal}>
                <div className={styles.childdivmodal}>
                    <h2>Pedido Mesa {props.order.table}</h2>
                    <RiCloseFill className={styles.close} onClick={props.CloseModal} />
                </div>
                <div className={styles.container}>
                    {
                        props.order.items &&
                        props.order.items.map((item, index) => {

                            return (
                                <div key={index} className={styles.card}>
                                    <span>{index + 1 + " - " + item.product.name}</span>
                                    <div className={styles.containerInformacoes}>
                                        <span>
                                            {item.product.description}
                                        </span>
                                        <div className={styles.containerImage}>
                                            <Image
                                                src={"http://localhost:3333/" + item.product.banner}
                                                alt={""}
                                                fill
                                                sizes="(max-width: 768px) 100vw"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <Button>Concluir Pedido</Button>
            </div>
        </dialog>
    )
}