import { IAddress } from "../IAddress";
import { IIdentity } from "../IIdentity";
import { ILeaseContract } from "../ILeaseContract";
import { IPerson } from "../IPerson";

export interface IPersonRequest extends IPerson {
    id?: string;
    name: string;
    birthDate: string;
    nationalityCountry: string;
    municipality: string;
    state: string;
    country: string;
    address?: IAddress;
    identity?: IIdentity;
    contractLocator?: ILeaseContract;
    contractTenant?: ILeaseContract;
}