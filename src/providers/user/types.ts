import { IUser, IRef, IUserTask, IItem } from "@/types"
  export interface IUserState {
    user: IUser | null
    items: IItem[]
    refferals: IRef[]
    dailyTasks: IUserTask[]
    allTasks: IUserTask[]
  }
  
  export interface IUserActions {
    setUser: (user: IUser) => void
    setItems: (model: IItem[]) => void
    setRefferals: (refferals: IRef[]) => void
    setDailyTasks: (tasks: IUserTask[]) => void
    setAllTasks: (tasks: IUserTask[]) => void
  }