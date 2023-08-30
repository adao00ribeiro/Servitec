import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ICompany } from '../interfaces/ICompany';
import { ICadastroPessoa } from '../Components/CadastroPessoa';
import { IPersonRequest } from '../interfaces/Request/IPersonRequest';
interface IUseCadastroPessoa {
    cadastroPessoa: ICadastroPessoa;
    Person: IPersonRequest;
    setPerson: (novo: IPersonRequest) => void;
    setCadastroPessoa: (novo: ICadastroPessoa) => void;
}

const useCadastroPessoa = create(persist<IUseCadastroPessoa>(
    (set, get) => ({
        cadastroPessoa: {
            IsNew: false,
            IsEdit: false,
        },
        Person: undefined,
        setPerson: (novo: IPersonRequest) => {
            set(() => (
                {
                    Person: novo
                }
            ));
        },
        setCadastroPessoa: (novo: ICadastroPessoa) => {
            set(() => (
                {
                    cadastroPessoa: novo
                }
            ));
        },
    }),
    {
        name: 'cadastropessoa-storage', // unique name
    }
))

export default useCadastroPessoa;