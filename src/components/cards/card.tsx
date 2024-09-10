import { IShopCard } from "@/types"
import { FC } from "react"
import ShopCardPurchased from "./card.purchased"
import ShopCardAvailable from "./card.available"
import ShopCardUnavailable from "./card.unavailable"

interface IShopCardProps {
    card: IShopCard
    saled: boolean
    blocked: boolean
    handleBuy: (card: IShopCard) => void
    handleUpgrade: (card: IShopCard) => void
}

const ShopCard:FC<IShopCardProps> = (props) => {
    
    const {
        card,
        saled,
        blocked,
        handleBuy,
        handleUpgrade
     } = props

    const onBuyClick = (card: IShopCard) => {
        handleBuy(card)
    }

    const onUpgradeClick = (card: IShopCard) => {
        handleUpgrade(card)
    }

    return (
        <>{ saled 
            ?<ShopCardPurchased onCardClick={onUpgradeClick} card={card} />
            :<>{ blocked
                ?<ShopCardUnavailable card={card} />
                :<ShopCardAvailable onCardClick={onBuyClick} card={card} />
            }
            </>
        }
        </>
            
    )
}   

export default ShopCard