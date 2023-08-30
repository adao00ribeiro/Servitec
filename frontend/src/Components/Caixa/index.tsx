import { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import Button from "../ui/Button";
import useOrders from "../../Store/useOrders";
import { ModalDetalheMesa } from "../Modal/ModalDetalheMesa";
import GetOrders from "../../services/funcoes/GetOrders";



export default _ => {
    const [IsOpenModal, setIsOpenModal] = useState(false)
    const orders = useOrders(state => state.orders)
    const setorders = useOrders(state => state.setOrders)
    const [valorSelecionado, setValorSelecionado] = useState(orders?.at(0)['id'] || '');




    useEffect(() => {
        GetOrders()
            .then((res) => {
                setorders(res)
            })
            .catch((erro) => {
                alert(erro.response);
            })
    }, [setorders])

    const handleSelecionarOpcao = (event) => {
        setValorSelecionado(event.target.value);
    };
    const OpenModal = () => {

        setIsOpenModal(true);
    }
    const CloseModal = () => {

        setIsOpenModal(false);
    }
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!valorSelecionado) {
            return;
        }
        OpenModal();
    }
    return (
        <div className={styles.containerCadastrar}>
            <h1>Caixa</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="select">Selecione uma Mesa:</label>
                <select
                    id="select"
                    name="select"
                    value={valorSelecionado}
                    onChange={handleSelecionarOpcao}
                >
                    {orders && orders.map((item, index) => {
                        return <option key={index} value={item['id']}>Mesa {item['table']}</option>
                    })}

                </select>
                <Button type="submit">Consultar</Button>
            </form>
            <ModalDetalheMesa IsOpen={IsOpenModal} CloseModal={CloseModal} />
        </div>
    )
}