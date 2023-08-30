import React, { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import Navegacao from "../Navegacao";
import Button from "../ui/Button";
import { Input, InputMask } from "../ui/Input";
import styles from "./styles.module.scss";
import { Select } from "../ui/Select";
import { ICompany } from "../../interfaces/ICompany";
import { IAddress } from "../../interfaces/IAddress";
import { useApi } from "../../hooks/useApi";
import PanelListCompany from "../PanelListCompany";
import { useMultationDeleteCompany, useRepoCompany } from "../../query/repo/company";


export default function CadastroEmpresa() {
    const api = useApi()
    const { data, isFetching, isError } = useRepoCompany();
    const deleteCompany = useMultationDeleteCompany();
    const [indexCompany, setindexCompany] = useState(0);
    const [company, setCompany] = useState<ICompany>({
        cnpj: "",
        datanire: "",
        name: "",
        nire: ""
    })
    const [companyAddress, setcompanyAddress] = useState<IAddress>({
        streetType: '',
        residence: "",
        number: "",
        complement: "",
        neighborhood: "",
        county: "",
        uf: "",
        pais: "",
        cep: "",
    })
    const [IsPanelList, setIsPanelList] = useState(false);
    const [IsNew, setIsNew] = useState(false);
    const [IsEdit, setIsEdit] = useState(false);
    useEffect(() => {
        console.log(data)
        if (data?.length > 0) {
            const c = { ...data[0] }
            setcompanyAddress(c.address)
            delete c.address;
            setCompany(c)
        } else {
            setCompany({
                cnpj: "",
                datanire: "",
                name: "",
                nire: ""
            })
            setcompanyAddress({
                streetType: '',
                residence: "",
                number: "",
                complement: "",
                neighborhood: "",
                county: "",
                uf: "",
                pais: "",
                cep: "",
            })
        }

    }, [data, setCompany, setcompanyAddress])

    function pressKey(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key == 'F2') {
            setIsPanelList(IsList => !IsList)
        }
    }

    const handleInputCompany = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCompany({ ...company, [name]: value, });

    }
    const handleInputAddress = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setcompanyAddress({
            ...companyAddress,
            [name]: value,
        });
    }
    const NavegacaoAction = (index: number) => {
        if (!data) {
            return;
        }
        setindexCompany(index)
        setCompany(data[index]);
    }
    const BtnNew = () => {
        if (!IsNew) {
            setCompany({
                cnpj: "",
                nire: "",
                datanire: "",
                name: ""
            });
            setcompanyAddress({
                streetType: '',
                residence: "",
                number: "",
                complement: "",
                neighborhood: "",
                county: "",
                uf: "",
                pais: "",
                cep: "",
            });
        } else {
            if (data?.length > 0) {
                setCompany(data[0])
                setcompanyAddress(data[0].address);
            } else {
                setCompany({
                    cnpj: "",
                    datanire: "",
                    name: "",
                    nire: ""
                })
                setcompanyAddress({
                    streetType: '',
                    residence: "",
                    number: "",
                    complement: "",
                    neighborhood: "",
                    county: "",
                    uf: "",
                    pais: "",
                    cep: "",
                })
            }
        }
        setIsNew(isnew => !isnew);
    }

    const btnSave = async (event: MouseEvent<HTMLButtonElement>) => {

        try {
            if (!IsEdit) {
                const res = await api.post('/company', company)
                const companyaddress = { ...companyAddress, companyId: res.data.id };
                delete companyaddress.personId;
                const response = await api.post('/address', companyaddress)
                setIsNew(false);
                setIsEdit(false);
                alert(response.statusText)
            } else {

                await api.patch(`/company/${company.id}`, company)
                const response = await api.patch(`/address/${companyAddress.id}`, companyAddress)
                setIsNew(false);
                setIsEdit(false);
                alert(response.statusText);
            }
        } catch (error) {
            alert(error?.response?.data?.message)
        }
    }

    const btnEdit = async (event: MouseEvent<HTMLButtonElement>) => {
        setIsEdit(edit => !edit);
    }
    const btnDelete = async (event: MouseEvent<HTMLButtonElement>) => {
        deleteCompany.mutate(company.id)
    }
    function OnSubmitHandle(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
    }
    return (
        <div className={styles.containerCadastrar}>
            <h1>Empresa</h1>
            <Navegacao
                index={indexCompany}
                max={data?.length}
                Action={NavegacaoAction}
            />
            {
                IsPanelList &&
                <PanelListCompany setCompany={setCompany} companys={data} setIsPanelList={setIsPanelList} />
            }

            <form className={styles.form} onSubmit={OnSubmitHandle}>

                <InputMask
                    type="text"
                    name="cnpj"
                    value={company.cnpj}
                    onChange={handleInputCompany}
                    placeholder="CNPJ"
                    onKeyDown={pressKey}
                    mask={"cnpj"}
                    disabled={!IsNew && !IsEdit}
                />

                <Input
                    type="text"
                    name="name"
                    value={company.name}
                    onChange={handleInputCompany}
                    placeholder="Nome da Empresa"
                    disabled={!IsNew && !IsEdit}
                />
                <div className={styles.groupRow}>
                    <Select
                        name="streetType"
                        onChange={handleInputAddress}
                        disabled={!IsNew && !IsEdit}
                    >
                        <option>Rua</option>
                        <option>Avenida</option>
                    </Select>
                    <Input
                        type="text"
                        name="residence"
                        value={companyAddress.residence}
                        onChange={handleInputAddress}
                        placeholder="Endereço"
                        disabled={!IsNew && !IsEdit}
                    />
                    <Input
                        type="text"
                        name="number"
                        value={companyAddress.number}
                        onChange={handleInputAddress}
                        placeholder="Número"
                        disabled={!IsNew && !IsEdit}
                    />
                </div>
                <div className={styles.groupRow}>
                    <Input
                        type="text"
                        name="complement"
                        value={companyAddress.complement}
                        onChange={handleInputAddress}
                        placeholder="Complemento"
                        disabled={!IsNew && !IsEdit}
                    />

                    <Input
                        type="text"
                        name="neighborhood"
                        value={companyAddress.neighborhood}
                        onChange={handleInputAddress}
                        placeholder="Bairro"
                        disabled={!IsNew && !IsEdit}
                    />
                </div>
                <div className={styles.groupRow}>
                    <Input
                        type="text"
                        name="county"
                        value={companyAddress.county}
                        onChange={handleInputAddress}
                        placeholder="Município"
                        disabled={!IsNew && !IsEdit}
                    />
                    <Input
                        type="text"
                        name="uf"
                        value={companyAddress.uf}
                        onChange={handleInputAddress}
                        placeholder="Uf"
                        disabled={!IsNew && !IsEdit}
                    />
                    <InputMask
                        mask="cep"
                        type="text"
                        name="cep"
                        value={companyAddress.cep}
                        onChange={handleInputAddress}
                        placeholder="CEP"
                        disabled={!IsNew && !IsEdit}
                    />
                </div>
                <div className={styles.groupRow}>
                    <Input
                        type="text"
                        id="nire"
                        name="nire"
                        value={company.nire}
                        onChange={handleInputCompany}
                        placeholder="Nire"
                        disabled={!IsNew && !IsEdit}
                    />

                    <Input
                        type="date"
                        name="datanire"
                        value={company.datanire}
                        onChange={handleInputCompany}
                        placeholder="Data do Nire"
                        title="Data do Nire"
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
            </form >
        </div >
    );
}
