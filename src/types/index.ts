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

/* User type */
export interface IUser {

    id: number
   
    name: string
    avatar: string
    
    active: boolean
    balance: number

    energy: number
    currentEnergy: number
    
    photoUrl: string
    energyPerSecond: number

    level: number

    bonus: number
}


/* Model/Market type */
export interface IItem {
    itemId : number
    itemLevel: number
    valuePerSecond: number
    blocked: boolean
    dependency: number
}

export interface IShopCardDependency {
    title: string
    level: number
}

export interface IShopCard {
    saled: boolean
    blocked: boolean
    income: number
    title: string
    price: number
    imgUrl: string
    level: number
    dependency?: IShopCardDependency
}

/* Refferer type */
export interface IRef {
    photoUrl: string,
    firstName: string
    surname: string
    isActive: true
    balance: number
}

export interface ITask {
    id: number
    name: string
    rewards: number
    isDifficult: boolean
    endDate: string | Date      
}

/* Task type */
export interface IUserTask {
    id: number
    state: 0 | 1 | 2
    activeMissionId: number
    confirmDateTime: string | Date
    data: ITask
    playerId: number
}