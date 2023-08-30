import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IUser } from '../interfaces/IUser';
import { ICategory } from '../interfaces/ICategory';
interface ICategoryProps {
    categorys: ICategory[];
    setCategorys: (categorys: ICategory[]) => void;
}

const useCategorys = create(persist<ICategoryProps>(
    (set, get) => ({
        categorys: undefined,
        setCategorys: (categorys: ICategory[]) => {
            set(() => (
                {
                    categorys: categorys
                }
            ));
        },
    }),
    {
        name: 'category-storage', // unique name
    }
))

export default useCategorys;