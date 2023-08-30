import { IsString } from "class-validator";
import { Identity } from "../entities/identity.entity";

export class CreateIdentityDto extends Identity {
    id?: string;
    @IsString()
    personId: string;
    @IsString()
    cpf: string;
    @IsString()
    rg: string;
    @IsString()
    dispatchBody: string;
    @IsString()
    uf: string;
    @IsString()
    date: string;
}
