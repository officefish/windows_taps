import { IPlayer, ICategory, IRef, IUserTask, IDailyQuest } from "@/types"
  export interface IUserState {
    player: IPlayer | null
    shop: ICategory[]
    dailyQuest: IDailyQuest
    refferals: IRef[]
    dailyTasks: IUserTask[]
    allTasks: IUserTask[]
  }
  
  export interface IUserActions {
    setPlayer: (user: IPlayer) => void
    updatePlayerBalance: (balance: number) => void 
    updatePlayerEnergy: (energyLatest: number, energyMax: number) => void
    setShop: (model: ICategory[]) => void
    setDailyQuest: (dailyQuest: IDailyQuest) => void
    updateDailyQuest: (recieved: boolean) => void
    setRefferals: (refferals: IRef[]) => void
    setDailyTasks: (tasks: IUserTask[]) => void
    setAllTasks: (tasks: IUserTask[]) => void
  }