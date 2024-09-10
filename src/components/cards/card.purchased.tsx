import { IShopCard } from "@/types"
import { FC, SyntheticEvent } from "react"



interface IShopCardProps {
    card: IShopCard
    onCardClick: (card: IShopCard) => void
}

const ShopCardPurchased:FC<IShopCardProps> = (props) => {
    
    const {
        card,
        onCardClick } = props

    const onClick = (e:SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault()
        onCardClick(card)
    }
    return (
        <div className={`card h-60 overflow-hidden image-scaled border-2 border-neutral text-neutral w-full z-0`}>
            <figure>
                <img
                    src={card.imageUrl}
                    alt={card.name} />
            </figure>
            <div className={`card-body`}>
                <div className="card-actions justify-end">
                <div className="btn btn-secondary" onClick={onClick}>Улучшить</div>
                </div>
                    <h2 className="card-title">{card.name}!</h2>
                    <p>Пассивный доход: {card.income}</p>
                    <p>Цена: {card.price}</p>
                    {/*props.blocked &&
                    // props.card.dependencies && 
                    // <p className="text-xs">Требуется: {dependency.title}, уровень: {dependency.level}</p>
                    */}
                </div>
        </div>
    )
}   

export default ShopCardPurchased