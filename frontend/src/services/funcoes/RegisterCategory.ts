
import { toast } from "react-toastify";
import { api } from "../apiClient";


export default async (categoria: string) => {
    try {
        const response = await api.post('/category', {name:categoria});
        toast.success(response.data.name +' registrado');
    } catch (e) {
        toast.error(e.response.data.message);
    }
}