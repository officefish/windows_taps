import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IUserState, IUserActions } from './types'
import { ITask, IPlayer, IDailyQuest, ICategory, IReferral } from '../../types'

type IUserStore = IUserState & IUserActions

const createUserStore = () =>
  createStore<IUserStore>()((set, get) => ({
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
              balance: state.player?.balance || 0,
              energyLatest,
              energyMax,
            },
          })
        }),
    updatePlayerIncome: (incomePerHour: number) =>
      set((state) => {
        return ({
          player: {
            ...state.player, // Preserve the other properties of the player
            balance: state.player?.balance || 0,
            incomePerHour,
          },
        })
      }),
    shop: [],
    dailyQuest: { claimedToday: false, streak: 0, nextReward: 0, recieved: false },
    referrals: new Map<number, IReferral[]>(),
    referralsTotal: 0,
    referralsPage: 1,
    referralsCode: '',
    dailyTasks: [],
    seasonTasks: [],
    setShop: (shop: ICategory[]) => set(() => ({ shop })),
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
    // Set referrals by page number
    setReferrals: (numPage: number, referrals: IReferral[]) =>
      set((state) => {
        const updatedReferrals = new Map(state.referrals);
        updatedReferrals.set(numPage, referrals);
        return { referrals: updatedReferrals };
      }),

    // Get referrals by page number
    getReferrals: (numPage: number) => {
      const state = get();
      return state.referrals.get(numPage) || [];
    },
    setReferralsTotal: (total: number) => set(() => ({ referralsTotal: total })),
    setReferralsPage: (page: number) => set(() => ({ referralsPage: page })),
    setReferralsCode: (code: string) => set(() => ({ referralsCode: code })),
    setDailyTasks: (tasks: ITask[]) => set(() => ({ dailyTasks:tasks })),
    setSeasonTasks: (tasks: ITask[]) => set(() => ({ seasonTasks:tasks })),
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
    updatePlayerIncome: useStore(api, (state: IUserStore) => state.updatePlayerIncome),
    shop: useStore(api, (state: IUserStore) => state.shop),
    setShop: useStore(api, (state: IUserStore) => state.setShop),
    dailyQuest: useStore(api, (state: IUserStore) => state.dailyQuest),
    updateDailyQuest: useStore(api, (state: IUserStore) => state.updateDailyQuest),
    setDailyQuest: useStore(api, (state: IUserStore) => state.setDailyQuest),
    refferals: useStore(api, (state: IUserStore) => state.referrals),
    dailyTasks: useStore(api, (state: IUserStore) => state.dailyTasks),
    seasonTasks: useStore(api, (state: IUserStore) => state.seasonTasks),    
    setRefferals: useStore(api, (state: IUserStore) => state.setReferrals),
    getRefferals: useStore(api, (state: IUserStore) => state.getReferrals),
    referralsPage: useStore(api, (state: IUserStore) => state.referralsPage),
    referralsTotal: useStore(api, (state: IUserStore) => state.referralsTotal),
    referralsCode: useStore(api, (state: IUserStore) => state.referralsCode),
    setReferralsTotal: useStore(api, (state: IUserStore) => state.setReferralsTotal),
    setReferralsPage: useStore(api, (state: IUserStore) => state.setReferralsPage),
    setReferralsCode: useStore(api, (state: IUserStore) => state.setReferralsCode),
    setDailyTasks: useStore(api, (state: IUserStore) => state.setDailyTasks),
    setSeasonTasks: useStore(api, (state: IUserStore) => state.setSeasonTasks),    
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