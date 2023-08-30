import { Prisma } from "@prisma/client";

export class Identity implements Prisma.IdentityUncheckedCreateInput {
    id?: string;
    personId: string;
    cpf: string;
    rg: string;
    dispatchBody: string;
    uf: string;
    date: string;
}
