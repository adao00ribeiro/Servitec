import { useApi } from "../../hooks/useApi";

export default async () => {
    const api = useApi();
    try {
        const responseUser = await api.get('/profile');
        return responseUser.data;
    } catch (error) {
        throw error
    }
}