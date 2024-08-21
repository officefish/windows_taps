import { IUserTask } from "@/types"

export const dailyTasks = [
    {
        id: 0,
        data: {
            name: "Подписаться на канал",
            rewards: 12_900,
            isDifficult: false,
            endDate: new Date(),
        },
        state: 0,
        //image: "/tasks/png/telegram.png"
        //endDate: new Date()
    },
] as IUserTask[]

export const allTasks = [
    {
        id: 0,
        data: {
            name: "Подписаться на канал",
            rewards: 12_900,
            isDifficult: false,
            endDate: new Date(),
        },
        state: 0,
        //image: "/tasks/png/telegram.png"
    },
    {
        id: 1,
        data: {
            name: "Подписаться на канал",
            rewards: 12_900,
            isDifficult: false,
            endDate: new Date(),
        },
        state: 1,
        //image: "/tasks/png/instagram.png"
    },
    {
        id: 2,
        data: {
            name: "Подписаться на канал",
            rewards: 12_900,
            isDifficult: false,
            endDate: new Date()
        },
       state: 2,
        //image: "/tasks/png/facebook.png"
    },
] as IUserTask[]