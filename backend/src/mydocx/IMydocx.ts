export enum ETypeContract {
    LEASECONTRACT = "LEASECONTRACT",
}


export interface IMydocx {
    pathModelContract: string,
    informacoes: [string, string][]
}