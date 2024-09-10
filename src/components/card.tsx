import { IShopCard } from "@/types"
import { FC, SyntheticEvent } from "react"



interface IShopCardProps {
    card: IShopCard
    handleBuy: (card: IShopCard) => void
    saled: boolean
    blocked: boolean
}

const ShopCard:FC<IShopCardProps> = (props) => {
    
    const handleBuy = props.handleBuy

    const onBuyClick = (e:SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault()
        handleBuy(props.card)
    }
    return (
        <div className={`card h-60 overflow-hidden
        ${props.saled ? 'image-scaled border-2 border-neutral text-neutral' : 'image-full'} w-full z-0`}>
            <figure>
                <img
                    //src={props.card.imgUrl}
                    src={''}
                    alt="Shoes" />
            </figure>
            <div className={`card-body`}>
                <div className="card-actions justify-end">
                {props.blocked 
                    ? <div className="btn btn-error btn-disabled">Недоступно</div> 
                        : props.saled 
                            ? null 
                            : <div className="btn btn-primary" onClick={onBuyClick}>Купить</div>
                }
                </div>
                    <h2 className="card-title">{props.card.name}!</h2>
                    <p>Пассивный доход: {0}</p>
                    <p>Цена: {props.card.price}</p>
                    {/*props.blocked &&
                    // props.card.dependencies && 
                    // <p className="text-xs">Требуется: {dependency.title}, уровень: {dependency.level}</p>
                    */}
                </div>
        </div>
    )
}   

export default ShopCard