import { useMutation, useQuery, useQueryClient } from "react-query";
import { useApi } from "../../hooks/useApi"
import { ICompanyRequest } from "../../interfaces/Request/ICompanyRequest";
import { IPersonRequest } from "../../interfaces/Request/IPersonRequest";


const api = useApi();

export function useRepoPerson() {
    return useQuery<IPersonRequest[]>(['repo-person'], async () => {
        const res = await api.get<IPersonRequest[]>('/person');
        return res.data;
    });
}

export function useMultationDeletePerson() {
    const client = useQueryClient();
    return useMutation(async (id: string) => {
        const res = await api.delete(`/person/${id}`);
        console.log(res);
        return res
    }, {
        onSuccess: () => {
            client.invalidateQueries('repo-person')
        },
        onError: () => {
            console.log('error')
        }
    })
}