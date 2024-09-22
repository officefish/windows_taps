export * from './shop'
export * from './player'
export * from './task'
export * from './quest'

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


