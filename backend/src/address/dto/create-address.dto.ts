import { IsOptional, IsString } from "class-validator";
import { Address } from "../entities/address.entity";

export class CreateAddressDto implements Address {
    id?: string;
    @IsString()
    @IsOptional()
    personId?: string;
    @IsString()
    @IsOptional()
    companyId?: string;
    @IsString()
    streetType: string;
    @IsString()
    residence: string;
    @IsString()
    number: string;
    @IsString()
    complement: string;
    @IsString()
    neighborhood: string;
    @IsString()
    county: string;
    @IsString()
    uf: string;
    @IsString()
    pais: string;
    @IsString()
    cep: string;
}
