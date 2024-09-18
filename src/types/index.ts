export * from './shop'
export * from './player'
export * from './task'

export enum Page {
    HOME = 'home',
    FRIENDS = 'friends',
    TASKS = 'tasks',
    SHOP = 'shop',
    OFFER = 'offer',
}

export interface ITelegramUser {
    playerId: number
    token: string
    fullname?: string
}


export interface IDailyQuest {
    claimedToday: boolean
    streak: number
    nextReward: number
    recieved?: boolean
}




/* Refferer type */
export interface IRef {
    photoUrl: string,
    firstName: string
    surname: string
    isActive: true
    balance: number
    income: number
}

// export interface ITask {
//     id: number
//     name: string
//     rewards: number
//     isDifficult: boolean
//     endDate: string | Date      
// }

// /* Task type */
// export interface IUserTask {
//     id: number
//     state: 0 | 1 | 2
//     activeMissionId: number
//     confirmDateTime: string | Date
//     data: ITask
//     playerId: number
// }