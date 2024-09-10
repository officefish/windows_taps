import { IShopCard } from "@/types"
import { FC, SyntheticEvent } from "react"



interface IShopCardProps {
    card: IShopCard
    onCardClick: (card: IShopCard) => void
}

const ShopCardAvailable:FC<IShopCardProps> = (props) => {
    
    const handleBuy = props.onCardClick

    const onBuyClick = (e:SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault()
        handleBuy(props.card)
    }
    return (
        <div className={`card h-60 overflow-hidden image-full w-full z-0`}>
            <figure>
                <img
                    src={props.card.imageUrl}
                    alt="Shoes" />
            </figure>
            <div className={`card-body`}>
                <div className="card-actions justify-end">
                <div className="btn btn-primary" onClick={onBuyClick}>Купить</div>
                </div>
                    <h2 className="card-title">{props.card.name}!</h2>
                    <p className="text-xs">Пассивный доход (за 10 урвоень): {props.card.income}</p>
                    <p>Цена: {props.card.price}</p>
            </div>
        </div>
    )
}   

export default ShopCardAvailable