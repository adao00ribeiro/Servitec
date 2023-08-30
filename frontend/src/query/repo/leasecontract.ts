import { useMutation, useQuery, useQueryClient } from "react-query";
import { useApi } from "../../hooks/useApi"
import { ILeaseContractRequest } from "../../interfaces/Request/ILeaseContractRequest";


const api = useApi();

export function useRepoLeaseContract() {
    return useQuery<ILeaseContractRequest[]>(['repo-leasecontract'], async () => {
        const res = await api.get<ILeaseContractRequest[]>('/leasecontract');
        return res.data;
    });
}

export function useMultationDeleteLeaseContract() {
    const client = useQueryClient();
    return useMutation(async (id: string) => {
        const res = await api.delete(`/leasecontract/${id}`);
        return res
    }, {
        onSuccess: () => {
            client.invalidateQueries('repo-leasecontract')
        },
        onError: () => {
            console.log('error')
        }
    })
}