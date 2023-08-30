import { Prisma } from "@prisma/client";
import { Company } from "src/company/entities/company.entity";
import { Leasecontract } from "../entities/leasecontract.entity";
import { IsString } from "class-validator";

export class CreateLeasecontractDto extends Leasecontract {
    id?: string;
    @IsString()
    tenantId: string;
    @IsString()
    propertyType: string;
    @IsString()
    address: string;
    @IsString()
    number: string;
    @IsString()
    neighborhood: string;
    @IsString()
    city: string;
    @IsString()
    state: string;
    @IsString()
    zipCode: string;
    @IsString()
    durationType: string;
    @IsString()
    duration: string;
    @IsString()
    extendedDuration: string;
    @IsString()
    startDate: string;
    @IsString()
    endDate: string;
    @IsString()
    amount: string;
    @IsString()
    amountInWords: string;
    @IsString()
    contractDate: string;
    @IsString()
    PersonLocatorId: string;
    @IsString()
    PersonTenantId: string;
}
