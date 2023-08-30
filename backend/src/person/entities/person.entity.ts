import { Prisma } from "@prisma/client";


export class Person implements Prisma.PersonUncheckedCreateInput {
    id?: string;
    name: string;
    birthDate: string;
    nationalityCountry: string;
    municipality: string;
    state: string;
    country: string;
    address?: Prisma.AddressUncheckedCreateNestedOneWithoutPersonInput;
    identity?: Prisma.IdentityUncheckedCreateNestedOneWithoutPersonInput;
    leaseContractLocator?: Prisma.LeaseContractUncheckedCreateNestedManyWithoutPersonLocatorInput;
    leaseContractTenant?: Prisma.LeaseContractUncheckedCreateNestedManyWithoutPersonTenantInput;


}
