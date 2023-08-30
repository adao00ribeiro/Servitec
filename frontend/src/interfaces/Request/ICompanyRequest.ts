import { IAddress } from "../IAddress";
import { ICompany } from "../ICompany";

export interface ICompanyRequest extends ICompany {
    id?: string;
    cnpj: string;
    nire: string;
    datanire: string;
    name: string;
    address: IAddress;
}