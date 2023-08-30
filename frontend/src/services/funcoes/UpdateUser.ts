import { toast } from "react-toastify";
import { IUser } from "../../interfaces/IUser";
import { api } from "../apiClient";

export default async (user )=>{
    try {
        const data = new FormData();
        data.append('name', user.name);
        data.append('email', user.email);
        data.append('jobtitle', user.jobtitle);
        data.append('password', user.password)
        data.append('imageUrl', user.avatarurl);
        data.append('file', user.imageAvatar);
        const response = await api.post('/user', data);
        toast.success(response.data.name + ' registrado');
       
    } catch (e) {
        toast.error(e.response.data.message);
    }
}