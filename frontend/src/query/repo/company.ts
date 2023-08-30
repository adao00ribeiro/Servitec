import { useMutation, useQuery, useQueryClient } from "react-query";
import { useApi } from "../../hooks/useApi"
import { ICompanyRequest } from "../../interfaces/Request/ICompanyRequest";


const api = useApi();

export function useRepoCompany() {
    return useQuery<ICompanyRequest[]>(['repo-company'], async () => {
        const res = await api.get<ICompanyRequest[]>('/company');
        return res.data;
    });
}

export function useMultationDeleteCompany() {
    const client = useQueryClient();
    return useMutation(async (id: string) => {
        const res = await api.delete(`/company/${id}`);
        return res
    }, {
        onSuccess: () => {
            client.invalidateQueries('repo-company')
        },
        onError: () => {
            console.log('error')
        }
    })
}