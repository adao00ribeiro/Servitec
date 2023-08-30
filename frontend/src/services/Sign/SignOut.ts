import Router from "next/router";
import { destroyCookie } from "nookies";
import { } from 'zustand/middleware'
export default () => {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch {
        console.log('erro ao deslogar');

    }
}
