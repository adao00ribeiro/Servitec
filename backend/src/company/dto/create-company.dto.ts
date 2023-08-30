import { Prisma } from "@prisma/client";

import { IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Company } from "../entities/company.entity";
import { CreateAddressDto } from "src/address/dto/create-address.dto";
import { Type } from 'class-transformer';
import { Address } from "src/address/entities/address.entity";



export class CreateCompanyDto extends Company {
    id?: string;
    @IsString()
    cnpj: string;
    @IsString()
    nire: string;
    @IsString()
    datanire: string;
    @IsString()
    name: string;
    address?: Prisma.AddressUncheckedCreateNestedOneWithoutCompanyInput;
}
