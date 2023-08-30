import Button from "../ui/Button";
import styles from "./styles.module.scss";
import { Input, InputMask } from "../ui/Input";
import Navegacao from "../Navegacao";
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { useRepoLeaseContract } from "../../query/repo/leasecontract";
import { Select } from "../ui/Select";
import { ILeaseContract } from "../../interfaces/ILeaseContract";

export function CadastroContratoLocacao() {

    const { data, isFetching, isError } = useRepoLeaseContract();
    const [indexLeaseContract, setindexLeaseContract] = useState(0);
    const [IsNew, setIsNew] = useState(false);
    const [IsEdit, setIsEdit] = useState(false);
    const [leaseContract, setleaseContract] = useState<ILeaseContract>({
        tenantId: "",
        propertyType: "",
        address: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
        durationType: "",
        duration: "",
        extendedDuration: "",
        startDate: "",
        endDate: "",
        amount: "",
        amountInWords: "",
        contractDate: "",
        PersonLocatorId: "",
        PersonTenantId: "",
    })

    function pressKey(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key == 'F2') {
            console.log("aperto f2")
        }
    }
    const NavegacaoAction = (index: number) => {
        if (!data) {
            return;
        }
        //setindexCompany(index)
        //setCompany(data[index]);
    }
    const BtnNew = () => {
        if (!IsNew) {

        } else {
            if (data?.length > 0) {

            } else {

            }
        }
        setIsNew(isnew => !isnew);
    }

    const btnSave = async (event: MouseEvent<HTMLButtonElement>) => {

        try {
            if (!IsEdit) {

            } else {


            }
        } catch (error) {
            alert(error?.response?.data?.message)
        }
    }

    const btnEdit = async (event: MouseEvent<HTMLButtonElement>) => {
        setIsEdit(edit => !edit);
    }
    const btnDelete = async (event: MouseEvent<HTMLButtonElement>) => {
        // deleteCompany.mutate(company.id)
    }
    function OnSubmitHandle(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
    }
    return (
        <div className={styles.containerContratoLocacao}>
            <h1>Contrato Locação</h1>

            <Navegacao
                index={indexLeaseContract}
                max={data?.length}
                Action={NavegacaoAction}
            />
            <form className={styles.form} onSubmit={OnSubmitHandle}>

                <Input
                    type="text"
                    id="nome_empresa"
                    name="nome_empresa"
                    placeholder="Locador"

                    disabled={!IsNew && !IsEdit}
                />
                <Input
                    type="text"
                    id="nome_empresa"
                    name="nome_empresa"
                    placeholder="Locatario"

                    disabled={!IsNew && !IsEdit}
                />
                <h1>Contrato</h1>
                <div className={styles.groupRow}>
                    <Select
                        disabled={!IsNew && !IsEdit}
                    >
                        <option value="Residencial">Residencial</option>
                        <option value="Comercial">Comercial</option>
                    </Select>
                </div>
                <div className={styles.groupRow}>
                    <Input
                        type="text"
                        id="bairro"
                        name="bairro"
                        placeholder="Endereço"
                        disabled={!IsNew && !IsEdit}
                    />
                    <Input
                        type="text"
                        id="cidade"
                        name="cidade"
                        placeholder="Numero"
                        disabled={!IsNew && !IsEdit}
                    />
                    <Input
                        type="text"
                        id="estado"
                        name="estado"
                        placeholder="Bairro"
                        disabled={!IsNew && !IsEdit}
                    />

                </div>
                <div className={styles.groupRow}>
                    <Input
                        type="text"
                        id="nire"
                        name="nire"
                        placeholder="Cidade"
                        disabled={!IsNew && !IsEdit}
                    />

                    <Input
                        type="text"
                        id="data_nire"
                        name="data_nire"
                        placeholder="Estado"

                        disabled={!IsNew && !IsEdit}
                    />
                    <InputMask
                        mask="cnpj"
                        type="text"
                        id="nome_empresa"
                        name="nome_empresa"
                        placeholder="CEP"
                        disabled={!IsNew && !IsEdit}
                    />
                </div>
                <span>Duracao Contrato</span>
                <div className={styles.groupRow}>
                    <Input
                        type="text"
                        id="nire"
                        name="nire"
                        placeholder="1"
                        disabled={!IsNew && !IsEdit}
                    />

                    <Input
                        type="text"
                        id="data_nire"
                        name="data_nire"
                        placeholder="Um"

                        disabled={!IsNew && !IsEdit}
                    />
                    <Select
                        disabled={!IsNew && !IsEdit}
                    >
                        <option value="Residencial">Ano</option>
                        <option value="Comercial">Mes</option>
                    </Select>
                </div>

                <div className={styles.groupRow}>
                    <Input
                        type="date"
                        id="nire"
                        name="nire"
                        placeholder="1"
                        disabled={!IsNew && !IsEdit}
                    />

                    <Input
                        type="date"
                        id="data_nire"
                        name="data_nire"
                        placeholder="Um"
                        disabled={!IsNew && !IsEdit}
                    />

                </div>
                <span>Valor do aluguel</span>
                <div className={styles.groupRow}>
                    <Input
                        type="text"
                        id="nire"
                        name="nire"
                        placeholder="0"
                        disabled={!IsNew && !IsEdit}
                    />

                    <Input
                        type="text"
                        id="data_nire"
                        name="data_nire"
                        placeholder="zero"

                        disabled={!IsNew && !IsEdit}
                    />

                </div>
                <div className={styles.containerDataContrato}>
                    <Input
                        type="date"
                        id="data_nire"
                        name="data_nire"
                        placeholder="Extenso"
                        disabled={!IsNew && !IsEdit}
                    />
                </div>

                <div className={styles.groupBtn}>
                    <Button
                        onClick={BtnNew}
                        disabled={IsEdit}
                        children={!IsNew ? "Novo" : "Cancelar"}

                    />
                    <Button
                        onClick={btnEdit}
                        disabled={IsNew}
                        children={!IsEdit ? "Editar" : "Cancelar"}

                    />
                    <Button
                        onClick={btnDelete}
                        disabled={IsNew} children={"Excluir"}

                    />
                    <Button
                        onClick={btnSave}
                        disabled={!IsNew && !IsEdit}
                        children={"Gravar"}

                    />
                </div>
            </form>
        </div>
    )
}