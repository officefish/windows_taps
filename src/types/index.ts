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
export interface IPlayer {
    balance?: number 
    createdAt?: string | Date
    firstName?: string
    energyLatest?: number
    energyMax?: number
    id?: string
    invitedById?: string 
    isPremium?: boolean 
    lastLogin?: string | Date
    lastLogout?: string | Date  
    lastName?: string 
    levelId?: number 
    rankId?: number 
    referralProfit?: number
    tgId?: number 
    username?: string
    imageUrl?: string 
    active?: boolean
    incomePerHour?: number
}

export interface IDailyQuest {
    claimedToday: boolean
    streak: number
    nextReward: number
    recieved?: boolean
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