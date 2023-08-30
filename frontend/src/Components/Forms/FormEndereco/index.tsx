import { ChangeEvent, useState } from "react";
import { Input } from "../../ui/Input";
import styles from "./styles.module.scss";
import { IAddress } from "../../../interfaces/IAddress";
import useCadastroPessoa from "../../../Store/useCadastroPessoa";
import { IPersonRequest } from "../../../interfaces/Request/IPersonRequest";

export default () => {
    const CadastroPessoa = useCadastroPessoa(state => state.cadastroPessoa)
    const Person = useCadastroPessoa(state => state.Person)
    const setPerson = useCadastroPessoa(state => state.setPerson)

    const handleAddress = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const p = { ...Person }
        p.address = {
            ...p.address, [name]: value
        }
        setPerson(p);
    }
    return (
        <div className={styles.form}>
            <div className={styles.groupRow}>
                <select
                    disabled={!CadastroPessoa.IsNew && !CadastroPessoa.IsEdit}
                >
                    <option> Rua</option>
                </select>
                <Input
                    name="residence"
                    value={Person?.address?.residence}
                    onChange={handleAddress}
                    placeholder="Endereço"
                    required
                    disabled={!CadastroPessoa.IsNew && !CadastroPessoa.IsEdit}
                />
                <Input
                    name="number"
                    value={Person?.address?.number}
                    onChange={handleAddress}
                    placeholder="Numero"
                    required
                    disabled={!CadastroPessoa.IsNew && !CadastroPessoa.IsEdit}
                />
            </div >
            <div className={styles.groupRow}>
                <Input
                    name="complement"
                    value={Person?.address?.complement}
                    onChange={handleAddress}
                    placeholder="Complemento"
                    disabled={!CadastroPessoa.IsNew && !CadastroPessoa.IsEdit}
                />
                <Input
                    name="neighborhood"
                    value={Person?.address?.neighborhood}
                    onChange={handleAddress}
                    placeholder="Bairro"
                    required
                    disabled={!CadastroPessoa.IsNew && !CadastroPessoa.IsEdit}
                />
            </div>
            <div className={styles.groupRow}>
                <Input
                    name="county"
                    value={Person?.address?.county}
                    onChange={handleAddress}
                    placeholder="Municipio"
                    required
                    disabled={!CadastroPessoa.IsNew && !CadastroPessoa.IsEdit}
                />
                <Input
                    name="uf"
                    value={Person?.address?.uf}
                    onChange={handleAddress}
                    placeholder="Uf"
                    required
                    disabled={!CadastroPessoa.IsNew && !CadastroPessoa.IsEdit}
                />
            </div>
            <div className={styles.groupRow}>
                <Input
                    name="pais"
                    value={Person?.address?.pais}
                    onChange={handleAddress}
                    placeholder="Pais"
                    required
                    disabled={!CadastroPessoa.IsNew && !CadastroPessoa.IsEdit}
                />
                <Input
                    name="cep"
                    value={Person?.address?.cep}
                    onChange={handleAddress}
                    placeholder="CEP"
                    required
                    disabled={!CadastroPessoa.IsNew && !CadastroPessoa.IsEdit}
                />
            </div>
        </div >
    )
}