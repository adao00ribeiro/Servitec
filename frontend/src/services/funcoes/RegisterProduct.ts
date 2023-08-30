import { toast } from "react-toastify";
import { api } from "../apiClient";
import { IProduct } from "../../interfaces/IProduct";


export default async (product: IProduct) => {
    try {
        const data = new FormData();
        data.append('name', product.name);
        data.append('price', product.price);
        data.append('description', product.description);
        data.append('banner', product.banner)
        data.append('category_id', product.category_id);
        data.append('file', product.imageAvatar);
        const response = await api.post('/product', data);
        toast.success(response.data.name + ' registrado');
        return true;
    } catch (e) {
        toast.error(e.response.data.message);
        return false;
    }
}