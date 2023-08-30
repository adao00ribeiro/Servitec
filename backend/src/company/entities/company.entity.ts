import { Prisma } from "@prisma/client";

export class Company {
    id?: string;
    cnpj: string;
    nire: string;
    datanire: string;
    name: string;
    address?: Prisma.AddressUncheckedCreateNestedOneWithoutCompanyInput;
}
