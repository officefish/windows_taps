import { IShopCard } from "@/types"
import { FC } from "react"
import ShopCardPurchased from "./card.purchased"
import ShopCardAvailable from "./card.available"
import ShopCardUnavailable from "./card.unavailable"
import { useUserStore } from "@/providers/user"

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

    const { player } = useUserStore()

    return (
        <>{ saled 
            ?<ShopCardPurchased onCardClick={onUpgradeClick} card={card}
            available={(card.price / 10 <= (player?.balance || 0)) && (card.level || 0) < 10}
            />
            :<>{ blocked
                ?<ShopCardUnavailable card={card} />
                :<ShopCardAvailable 
                onCardClick={onBuyClick} 
                available={(card.price <= (player?.balance || 0))} 
                card={card} />
            }
            </>
        }
        </>
            
    )
}   

export default ShopCard