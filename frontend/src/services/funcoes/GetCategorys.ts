import { ICategory } from "../../interfaces/ICategory";
import { api } from "../apiClient";

export default async () => {
    try {
        const responseCategory = await api.get('/category');
        const Listcategorys: ICategory[] = [
            { id: '', name: "Selecione uma categoria" },
            ...responseCategory.data.sort((a, b) => a.name.localeCompare(b.name))
        ];
        return Listcategorys;
    } catch (error) {
        throw error;
    }
}