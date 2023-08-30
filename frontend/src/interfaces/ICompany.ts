import { IAddress } from "./IAddress";

export interface ICompany {
    id?: string;
    cnpj: string;
    nire: string;
    datanire: string;
    name: string;
}