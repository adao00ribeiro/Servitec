import styles from "./styles.module.scss";
import Button from "../ui/Button";
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { Input } from "../ui/Input";
import Navegacao from "../Navegacao";
import Tabs from "../Tabs";
import { useRepoPerson } from "../../query/repo/person";
import useCadastroPessoa from "../../Store/useCadastroPessoa";
import { api } from "../../services/apiClient";


export interface ICadastroPessoa {
    IsNew: boolean;
    IsEdit: boolean;
}


export function CadastroPessoa() {

    const { data, isFetching, isError } = useRepoPerson();
    const [IsPanelList, setIsPanelList] = useState(false);
    const CadastroPessoa = useCadastroPessoa(state => state.cadastroPessoa);
    const setCadastroPessoa = useCadastroPessoa(state => state.setCadastroPessoa);
    const Person = useCadastroPessoa(state => state.Person);
    const setPerson = useCadastroPessoa(state => state.setPerson);

    const [indexPerson, setindexPerson] = useState(0);

    function pressKey(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key == 'F2') {
            setIsPanelList(IsList => !IsList)
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
                setPerson(data[0])

            } else {
                setPerson(Person)
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
                const response = await api.post('/person', Person)

                alert(response.statusText)
            } else {


            }
        } catch (error) {
            alert(error?.response?.data?.message)
        }
    }
    const handleInputPerson = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const p = { ...Person, [name]: value }
        setPerson(p);
    }
    const btnEdit = async (event: MouseEvent<HTMLButtonElement>) => {

        setCadastroPessoa({
            ...CadastroPessoa,
            IsEdit: !CadastroPessoa.IsEdit
        })
    }
    const btnDelete = async (event: MouseEvent<HTMLButtonElement>) => {
        // deleteCompany.mutate(company.id)
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