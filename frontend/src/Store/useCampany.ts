import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ICompany } from '../interfaces/ICompany';
interface ICompanyProps {
    company: ICompany;
    setCompany: (company: ICompany) => void;
}

const useCompany = create(persist<ICompanyProps>(
    (set, get) => ({
        company: {
            cnpj: "",
            nire: "",
            datanire: "",
            name: "",
            address: {
                personId: '',
                companyId: '',
                streetType: '',
                residence: "",
                number: "",
                complement: "",
                neighborhood: "",
                county: "",
                uf: "",
                pais: "",
                cep: "",
            }
        },
        setCompany: (company: ICompany) => {
            set(() => (
                {
                    company: company
                }
            ));
        },
    }),
    {
        name: 'company-storage', // unique name
    }
))

export default useCompany;