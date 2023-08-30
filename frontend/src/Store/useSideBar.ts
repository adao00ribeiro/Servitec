import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SideBarProps = {
    IsActive: boolean,
    setIsActive: (IsActive: boolean) => void
}

const useSideBar = create(persist<SideBarProps>(
    (set) => ({
        IsActive: true,
        setIsActive: (newcurrent: boolean) => {
            set((state) => (
                {
                    IsActive: newcurrent
                }
            ));
        }
    }),
    {
        name: 'sidebar-storage', // unique name
    }
))

export default useSideBar;