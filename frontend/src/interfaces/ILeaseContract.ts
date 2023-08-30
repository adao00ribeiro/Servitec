export interface ILeaseContract {
    id?: string;
    tenantId: string;
    propertyType: string;
    address: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    durationType: string;
    duration: string;
    extendedDuration: string;
    startDate: string;
    endDate: string;
    amount: string;
    amountInWords: string;
    contractDate: string;
    PersonLocatorId: string;
    PersonTenantId: string;
}