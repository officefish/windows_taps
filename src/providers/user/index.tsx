import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IUserState, IUserActions } from './types'
import { IItem, IRef, IUserTask, IPlayer, IDailyQuest } from '../../types'

type IUserStore = IUserState & IUserActions

const createUserStore = () =>
  createStore<IUserStore>()((set) => ({
    player: null,
    setPlayer: (player: IPlayer) => set(() => ({ player })),
    updatePlayerBalance: (balance: number) =>
      set((state) => {
        return ({
          player: {
            ...state.player, // Preserve the other properties of the player
            balance,
           
          },
        })
      }),
      updatePlayerEnergy: (energyLatest: number, energyMax: number) =>
        set((state) => {
          return ({
            player: {
              ...state.player, // Preserve the other properties of the player
              energyLatest,
              energyMax,
            },
          })
        }),
    items: [],
    dailyQuest: { claimedToday: false, streak: 0, nextReward: 0, recieved: false },
    refferals: [],
    dailyTasks: [],
    allTasks: [],
    setItems: (items: IItem[]) => set(() => ({ items })),
    setDailyQuest: (dailyQuest: IDailyQuest) => set(() => ({ dailyQuest })),
    updateDailyQuest: (recieved: boolean) => {
      set((state) => {
        return ({
          dailyQuest: {
            ...state.dailyQuest, // Preserve the other properties of the player
            recieved,
          },
        })
      })
    },
    setRefferals: (refferals: IRef[]) => set(() => ({ refferals })),
    setDailyTasks: (tasks: IUserTask[]) => set(() => ({ dailyTasks:tasks })),
    setAllTasks: (tasks: IUserTask[]) => set(() => ({ allTasks:tasks })),
  }))

type UserStore = ReturnType<typeof createUserStore>
const UserContext = createContext<UserStore | null>(null)

//eslint-disable-next-line react-refresh/only-export-components
export const useUserStore = () => {
  const api = useContext(UserContext) as StoreApi<IUserStore>
  return {
    player: useStore(api, (state: IUserStore) => state.player),
    setPlayer: useStore(api, (state: IUserStore) => state.setPlayer),
    updatePlayerBalance: useStore(api, (state: IUserStore) => state.updatePlayerBalance),
    updatePlayerEnergy: useStore(api, (state: IUserStore) => state.updatePlayerEnergy),
    items: useStore(api, (state: IUserStore) => state.items),
    setItems: useStore(api, (state: IUserStore) => state.setItems),
    dailyQuest: useStore(api, (state: IUserStore) => state.dailyQuest),
    updateDailyQuest: useStore(api, (state: IUserStore) => state.updateDailyQuest),
    setDailyQuest: useStore(api, (state: IUserStore) => state.setDailyQuest),
    refferals: useStore(api, (state: IUserStore) => state.refferals),
    dailyTasks: useStore(api, (state: IUserStore) => state.dailyTasks),
    allTasks: useStore(api, (state: IUserStore) => state.allTasks),    
    setRefferals: useStore(api, (state: IUserStore) => state.setRefferals),
    setDailyTasks: useStore(api, (state: IUserStore) => state.setDailyTasks),
    setAllTasks: useStore(api, (state: IUserStore) => state.setAllTasks),    
  }
}

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const userStoreRef = useRef<UserStore>()
  if (!userStoreRef.current) {
    userStoreRef.current = createUserStore()
  }
  return (
    <UserContext.Provider value={userStoreRef.current}>
      {children}
    </UserContext.Provider>
  )
}