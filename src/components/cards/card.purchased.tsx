import { IShopCard } from "@/types"
import { FC, SyntheticEvent, useState } from "react"



interface IShopCardProps {
    card: IShopCard
    onCardClick: (card: IShopCard) => void
    available: boolean
}

const ShopCardPurchased:FC<IShopCardProps> = (props) => {
    
    const {
        card,
        onCardClick,
        available
    } = props

    const onClick = (e:SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onCardClick(card)
    }

    const [upgradePrice, ] = useState(card.price / 10) 
    return (
        <div className={`card h-60 overflow-hidden image-scaled border-2 border-neutral text-neutral w-full z-0`}>
            <figure>
                <img
                    src={card.imageUrl}
                    alt={card.name} />
            </figure>
            <div className={`card-body`}>
                
                    {card && card.level && card.level < 10 && (
                        <div className="card-actions justify-end">
                            <button className="btn btn-secondary" onClick={onClick} disabled={!available}>Улучшить</button>
                            <h2 className="card-title">{card.name}!</h2>
                            <p className="text-xs">Текущий уровень: {card.level}</p>
                            <p className="text-xs">Пассивный доход: {card.income / 10 * (card.level || 1)}</p>
                            <p className="text-xs">После улучшение: {card.income / 10 * ((card.level || 1) + 1)}</p>
                            <p className="text-xs">Цена за лучшение: {upgradePrice}</p> 
                        </div>
                    )}
                    {card && card.level && card.level == 10 && (
                        <div className="card-actions justify-end">
                            <h2 className="card-title">{card.name}!</h2>
                            <p className="text-xs">Пассивный доход: {card.income}</p>
                            <p className="text-xs">Максимальный уровень</p>
                        </div>
                    )}
                </div>
        </div>
    )
}   

export default ShopCardPurchased