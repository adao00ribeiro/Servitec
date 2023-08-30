
import { api } from "../apiClient";

export default async () => {
    try {
        const responseOrders = await api.get('/order');
        return responseOrders.data;
    } catch (error) {
        throw error;
    }
}