import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IUser } from '../interfaces/IUser';
import { IOrder } from '../interfaces/IOrder';
interface IOrderProps {
    orders: IOrder[];
    setOrders: (orders: IOrder[]) => void;
}

const useOrders = create(persist<IOrderProps>(
    (set, get) => ({
        orders: undefined,
        setOrders: (orders: IOrder[]) => {
            set(() => (
                {
                    orders: orders
                }
            ));
        },
    }),
    {
        name: 'orders-storage', // unique name
    }
))

export default useOrders;