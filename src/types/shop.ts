/* Model/Market type */
import { RankType } from "./player"


export interface IItem {
    itemId : number
    itemLevel: number
    valuePerSecond: number
    blocked: boolean
    dependency: number
}

export interface IShopCardDependency {
    id: string, 
    itemId: string, 
    dependsOnId: string
}

export interface IShopCard {
   id: string
   categoryId: string
   name: string
   price: number
   rank: RankType 
   depenedencies: IShopCardDependency[]
}

export interface ICategory {
    title: string
    available: IShopCard[]
    unavailable: IShopCard[]
    purchased: IShopCard[]
}