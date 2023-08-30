import { Prisma } from "@prisma/client";
import { Person } from "../entities/person.entity";
import { IsString } from "class-validator";

export class CreatePersonDto extends Person {
    id?: string;
    @IsString()
    name: string;
    @IsString()
    birthDate: string;
    @IsString()
    nationalityCountry: string;
    @IsString()
    municipality: string;
    @IsString()
    state: string;
    @IsString()
    country: string;
    address?: Prisma.AddressUncheckedCreateNestedOneWithoutPersonInput;
    identity?: Prisma.IdentityUncheckedCreateNestedOneWithoutPersonInput;
    leaseContractLocator?: Prisma.LeaseContractUncheckedCreateNestedManyWithoutPersonLocatorInput;
    leaseContractTenant?: Prisma.LeaseContractUncheckedCreateNestedManyWithoutPersonTenantInput;
}
