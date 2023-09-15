import styles from "./styles.module.scss";
import Button from "../ui/Button";
import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { Input } from "../ui/Input";
import Navegacao from "../Navegacao";
import Tabs from "../Tabs";
import { useMultationDeletePerson, useRepoPerson } from "../../query/repo/person";
import useCadastroPessoa from "../../Store/useCadastroPessoa";
import { api } from "../../services/apiClient";
import { useApi } from "../../hooks/useApi";

export interface ICadastroPessoa {
    IsNew: boolean;
    IsEdit: boolean;
}


export function CadastroPessoa() {
    const api = useApi();
    const { data, isFetching, isError } = useRepoPerson();
    const [IsPanelList, setIsPanelList] = useState(false);
    const CadastroPessoa = useCadastroPessoa(state => state.cadastroPessoa);
    const setCadastroPessoa = useCadastroPessoa(state => state.setCadastroPessoa);
    const Person = useCadastroPessoa(state => state.Person);
    const setPerson = useCadastroPessoa(state => state.setPerson);
    const deletePerson = useMultationDeletePerson();
    const [indexPerson, setindexPerson] = useState(0);
    useEffect(() => {

        if (data?.length > 0) {
            console.log(data[data.length - 1])
            setPerson(data[data.length - 1]);
        } else {
            setPerson({
                name: "",
                birthDate: "",
                nationalityCountry: "",
                municipality: "",
                state: "",
                country: "",
                address: {
                    streetType: "",
                    residence: "",
                    number: "",
                    complement: "",
                    neighborhood: "",
                    county: "",
                    uf: "",
                    pais: "",
                    cep: "",
                },
                identity: {
                    personId: "",
                    cpf: "",
                    rg: "",
                    dispatchBody: "",
                    uf: "",
                    date: "",
                }
            });
        }
    }, [data, setPerson])
    function pressKey(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key == 'F2') {
            setIsPanelList(IsList => !IsList)
        }
    }
    const NavegacaoAction = (index: number) => {
        if (!data) {
            return;
        }
        setindexPerson(index)
        setPerson(data[index]);
    }
    const BtnNew = () => {
        if (!CadastroPessoa.IsNew) {
            setPerson({
                name: "",
                birthDate: "",
                nationalityCountry: "",
                municipality: "",
                state: "",
                country: "",
                address: {
                    streetType: "",
                    residence: "",
                    number: "",
                    complement: "",
                    neighborhood: "",
                    county: "",
                    uf: "",
                    pais: "",
                    cep: "",
                },
                identity: {
                    personId: "",
                    cpf: "",
                    rg: "",
                    dispatchBody: "",
                    uf: "",
                    date: "",
                }
            });
        } else {
            if (data?.length > 0) {
                setPerson(data[data.length - 1])

            } else {
                setPerson({
                    name: "",
                    birthDate: "",
                    nationalityCountry: "",
                    municipality: "",
                    state: "",
                    country: "",
                    address: {
                        streetType: "",
                        residence: "",
                        number: "",
                        complement: "",
                        neighborhood: "",
                        county: "",
                        uf: "",
                        pais: "",
                        cep: "",
                    },
                    identity: {
                        personId: "",
                        cpf: "",
                        rg: "",
                        dispatchBody: "",
                        uf: "",
                        date: "",
                    }
                });
            }
        }
        setCadastroPessoa(
            {
                ...CadastroPessoa,
                IsNew: !CadastroPessoa.IsNew
            }
        );
    }

    const btnSave = async (event: MouseEvent<HTMLButtonElement>) => {

        try {
            if (!CadastroPessoa.IsEdit) {
                const response = await api.post('/person', Person);
                const idperson = response.data.id;
                const address = { ...Person.address, personId: idperson }
                const resaddress = await api.post('/address', address)
                const identity = { ...Person.identity, personId: idperson }
                const residentity = await api.post('/identity', identity)
                alert(residentity.statusText)
            } else {
                console.log(Person)
                const response = await api.patch(`/person/${Person.id}`, Person);

            }
        } catch (error) {
            alert(error?.response?.data?.message)
        }
        setCadastroPessoa(
            {
                ...CadastroPessoa,
                IsNew: false,
                IsEdit: false
            }
        );
    }
    const handleInputPerson = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const p = { ...Person, [name]: value }
        setPerson(p);
    }
    const btnEdit = async (event: MouseEvent<HTMLButtonElement>) => {
        setCadastroPessoa(
            {
                ...CadastroPessoa,
                IsEdit: !CadastroPessoa.IsEdit
            }
        );
    }
    const btnDelete = async (event: MouseEvent<HTMLButtonElement>) => {
        try {
            const res = await api.delete(`/identity/${Person.identity.id}`);
            deletePerson.mutate(Person.id);
        } catch (error) {
            console.log(error);
        }
    }
    function OnSubmitHandle(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
    }
    return (
        <div className={styles.containerCadastrar}>
            <h1>Pessoa</h1>
            <Navegacao
                index={indexPerson}
                max={data?.length}
                Action={NavegacaoAction}
            />
            <form className={styles.form} onSubmit={OnSubmitHandle}>
                <div className={styles.group}>
                    <Input
                        type="text"
                        name="name"
                        value={Person?.name}
                        placeholder="Nome"
                        onChange={handleInputPerson}
                        required
                        disabled={!CadastroPessoa.IsNew && !CadastroPessoa.IsEdit}
                    />
                </div>
                <Tabs />
                <div className={styles.groupBtn}>
                    <Button
                        onClick={BtnNew}
                        disabled={CadastroPessoa.IsEdit}
                        children={!CadastroPessoa.IsNew ? "Novo" : "Cancelar"}
                    />
                    <Button
                        onClick={btnEdit}
                        disabled={CadastroPessoa.IsNew}
                        children={!CadastroPessoa.IsEdit ? "Editar" : "Cancelar"}
                    />
                    <Button
                        onClick={btnDelete}
                        disabled={CadastroPessoa.IsNew} children={"Excluir"}
                    />
                    <Button
                        onClick={btnSave}
                        disabled={!CadastroPessoa.IsNew && !CadastroPessoa.IsEdit}
                        children={"Gravar"}
                    />
                </div>
            </form>
        </div>
    )
}