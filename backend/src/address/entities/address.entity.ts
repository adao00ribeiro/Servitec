import { Prisma } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";

export class Address implements Prisma.AddressUncheckedCreateInput {
    id?: string;
    personId?: string;
    companyId?: string;
    streetType: string;
    residence: string;
    number: string;
    complement: string;
    neighborhood: string;
    county: string;
    uf: string;
    pais: string;
    cep: string;
}
