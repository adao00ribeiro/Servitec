import { setCookie } from "nookies";
import { SignInProps } from "../../interfaces/SignInProps";
import Router from "next/router";
import { toast } from "react-toastify"
import { useApi } from "../../hooks/useApi";
export async function SignIn({ email, password }: SignInProps, setToken: (token) => void) {
    const api = useApi();
    try {
        const response = await api.post('/auth/login', {
            email,
            password
        });
        const { access_token } = response.data;
        setToken(access_token);
        setCookie(undefined, '@nextauth.token', access_token, {
            maxAge: 60 * 60 * 24 * 30,// expira em 1 mes
            path: "/" //uais caminho terao acesso ao cookies / é todos
        })
        //passar para as proximas reuisios o token
        api.defaults.headers['Authorization'] = `Bearear ${access_token}`
        toast.success("Logado com sucesso");
        await setTimeout(() => {
            Router.push("/dashboard");
        }, 1000);
    } catch (e) {
        toast.error(e.response?.data?.message);
    }
}