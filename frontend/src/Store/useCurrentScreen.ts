import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { ECurrentScreen } from '../enums/ECurrentScreen';

interface CurrentScreen {
    current: ECurrentScreen,
    setCurrent: (newcurrent: ECurrentScreen) => void
}

const useCurrentScreen = create<CurrentScreen>()(
    devtools(
        persist<CurrentScreen>(

            (set) => ({
                current: ECurrentScreen.DEFAULT,
                setCurrent: (newcurrent: ECurrentScreen) => {
                    set((state) => (
                        {
                            current: newcurrent
                        }
                    ));
                }
            }),
            {
                name: 'currentScreen-storage', // unique name
            }
        )))

export default useCurrentScreen;