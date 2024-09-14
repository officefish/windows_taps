import { IPlayer, ICategory, IUserTask, IDailyQuest, IReferral } from "@/types"
  export interface IUserState {
    player: IPlayer | null
    shop: ICategory[]
    dailyQuest: IDailyQuest
    referrals: Map<number, IReferral[]> // Updated to Map
    referralsTotal: number
    referralsPage: number
    referralsCode: string
    dailyTasks: IUserTask[]
    allTasks: IUserTask[]
  }
  
  export interface IUserActions {
    setPlayer: (user: IPlayer) => void
    updatePlayerBalance: (balance: number) => void 
    updatePlayerEnergy: (energyLatest: number, energyMax: number) => void
    updatePlayerIncome: (income: number) => void 
    setShop: (model: ICategory[]) => void
    setDailyQuest: (dailyQuest: IDailyQuest) => void
    updateDailyQuest: (recieved: boolean) => void
    setReferrals: (numPage: number, refferals: IReferral[]) => void
    getReferrals: (numPage: number) =>  IReferral[] 
    setReferralsTotal: (total: number) => void
    setReferralsPage: (page: number) => void
    setReferralsCode: (code: string) => void
    setDailyTasks: (tasks: IUserTask[]) => void
    setAllTasks: (tasks: IUserTask[]) => void
  }