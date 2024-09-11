import { IShopCard } from "@/types"
import { FC, SyntheticEvent } from "react"

interface IShopCardProps {
    card: IShopCard
    onCardClick: (card: IShopCard) => void
    available: boolean
}

const ShopCardAvailable:FC<IShopCardProps> = (props) => {

    const { available, card } = props
    const handleBuy = props.onCardClick

    const onBuyClick = (e:SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleBuy(props.card)
    }

   
    return (
        <div className={`card h-60 overflow-hidden image-full w-full z-0`}>
            <figure>
                <img
                    src={card.imageUrl}
                    alt={card.name} />
            </figure>
            <div className={`card-body`}>
                <div className="card-actions justify-end">
                 <button className="btn btn-primary" onClick={onBuyClick} disabled={!available}
                 >Купить
                </button> 
               
                </div>
                    <h2 className="card-title">{card.name}!</h2>
                    <p className="text-xs">Пассивный доход (за 10 урвоень): {card.income}</p>
                    <p>Цена: {card.price}</p>
            </div>
        </div>
    )
}   

export default ShopCardAvailable