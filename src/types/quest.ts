
export interface IDailyQuest {
    claimedToday: boolean
    streak: number
    nextReward: number
    recieved?: boolean
}


export interface IMinigame {
    isBlocked: boolean,
    remainingTime: number,
    win: boolean
} 
