import { ChangeEvent, useState } from "react";
import { IIdentity } from "../../../interfaces/IIdentity";
import { Input } from "../../ui/Input";
import styles from "./styles.module.scss";
import useCadastroPessoa from "../../../Store/useCadastroPessoa";


export default () => {
    const cadastroPessoa = useCadastroPessoa(state => state.cadastroPessoa)
    const Person = useCadastroPessoa(state => state.Person)
    const setPerson = useCadastroPessoa(state => state.setPerson)
    const handleIdentity = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const p = { ...Person }
        p.identity = {
            ...p.identity, [name]: value
        }
        setPerson(p);
    }
    return (
        <div className={styles.form}>
            <div className={styles.groupRow}>
                <Input
                    name="cpf"
                    value={Person?.identity?.cpf}
                    placeholder="CPF"
                    onChange={handleIdentity}
                    required
                    disabled={!cadastroPessoa.IsNew && !cadastroPessoa.IsEdit}
                />
            </div>
            <div className={styles.groupRow}>
                <div className={styles.groupRow}>
                    <Input
                        name="rg"
                        value={Person?.identity?.rg}
                        placeholder="RG"
                        onChange={handleIdentity}
                        disabled={!cadastroPessoa.IsNew && !cadastroPessoa.IsEdit}
                    />
                </div>
                <div className={styles.groupRow}>

                    <Input
                        name="dispatchBody"
                        value={Person?.identity?.dispatchBody}
                        placeholder="EXPEDICAO"
                        onChange={handleIdentity}
                        disabled={!cadastroPessoa.IsNew && !cadastroPessoa.IsEdit}
                    />
                </div>
            </div>
            <div className={styles.groupRow}>
                <Input
                    name="uf"
                    value={Person?.identity?.uf}
                    placeholder="UF"
                    onChange={handleIdentity}
                    disabled={!cadastroPessoa.IsNew && !cadastroPessoa.IsEdit}
                />
                <Input
                    name="date"
                    value={Person?.identity?.date}
                    type="date"
                    placeholder="DATA"
                    onChange={handleIdentity}
                    disabled={!cadastroPessoa.IsNew && !cadastroPessoa.IsEdit}
                />
            </div>
        </div >
    )
}