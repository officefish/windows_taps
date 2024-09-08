import { IPlayer, IRef, IUserTask, IItem } from "@/types"
  export interface IUserState {
    player: IPlayer | null
    items: IItem[]
    refferals: IRef[]
    dailyTasks: IUserTask[]
    allTasks: IUserTask[]
  }
  
  export interface IUserActions {
    setPlayer: (user: IPlayer) => void
    updatePlayerBalance: (balance: number) => void 
    updatePlayerEnergy: (energyLatest: number, energyMax: number) => void
    setItems: (model: IItem[]) => void
    setRefferals: (refferals: IRef[]) => void
    setDailyTasks: (tasks: IUserTask[]) => void
    setAllTasks: (tasks: IUserTask[]) => void
  }