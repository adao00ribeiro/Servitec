import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IUser } from '../interfaces/IUser';
interface IUserProps {
    user: IUser;
    token: string;
    setUser: (user: IUser) => void;
    setToken: (newtoken: string) => void;
}

const useUser = create(persist<IUserProps>(
    (set, get) => ({
        user: undefined,
        token: undefined,
        setUser: (user: IUser) => {
            set((state) => (
                {
                    user: user
                }
            ));
        },
        setToken: (newtoken: string) => {
            set((state) => (
                {
                    token: newtoken
                }
            ));
        }
    }),
    {
        name: 'user-storage', // unique name
    }
))

export default useUser;