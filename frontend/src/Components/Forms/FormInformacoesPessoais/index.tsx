import { ChangeEvent, useState } from "react";
import { Input } from "../../ui/Input";
import styles from "./styles.module.scss";
import { IPerson } from "../../../interfaces/IPerson";
import useCadastroPessoa from "../../../Store/useCadastroPessoa";

export default () => {
    const CadastroPessoa = useCadastroPessoa(state => state.cadastroPessoa)
    const Person = useCadastroPessoa(state => state.Person)
    const setPerson = useCadastroPessoa(state => state.setPerson)
    const handleInformacoesPessoais = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const p = { ...Person, [name]: value }
        setPerson(p);
    }
    return (
        <div className={styles.form}>
            <div className={styles.groupRow}>
                <Input
                    type="date"
                    name="birthDate"
                    value={Person?.birthDate}
                    onChange={handleInformacoesPessoais}
                    placeholder="Data Nascimento"
                    required
                    disabled={!CadastroPessoa.IsNew && !CadastroPessoa.IsEdit}
                />

                <Input
                    name="nationalityCountry"
                    value={Person?.nationalityCountry}
                    onChange={handleInformacoesPessoais}
                    placeholder="Nacionalidade"
                    required
                    disabled={!CadastroPessoa.IsNew && !CadastroPessoa.IsEdit}
                />
            </div>
            <div className={styles.groupRow}>
                <Input
                    name="municipality"
                    value={Person?.municipality}
                    onChange={handleInformacoesPessoais}
                    placeholder="Municipio"
                    required
                    disabled={!CadastroPessoa.IsNew && !CadastroPessoa.IsEdit}
                />
                <Input
                    name="state"
                    value={Person?.state}
                    onChange={handleInformacoesPessoais}
                    placeholder="Uf"
                    required
                    disabled={!CadastroPessoa.IsNew && !CadastroPessoa.IsEdit}
                />
            </div>
            <Input
                name="country"
                value={Person?.country}
                onChange={handleInformacoesPessoais}
                placeholder="Pais"
                required
                disabled={!CadastroPessoa.IsNew && !CadastroPessoa.IsEdit}
            />
        </div >
    )
}