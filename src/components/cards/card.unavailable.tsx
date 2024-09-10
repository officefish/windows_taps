import { IShopCard } from "@/types"
import { FC } from "react"



interface IShopCardProps {
    card: IShopCard
}

const ShopCardUnavailable:FC<IShopCardProps> = (props) => {
    

    return (
        <div className={`card h-60 overflow-hidden image-scaled border-2 border-neutral text-neutral  w-full z-0`}>
            <figure>
                <img
                    src={props.card.imageUrl}
                    alt="Shoes" />
            </figure>
            <div className={`card-body`}>
                <div className="card-actions justify-end">
                    <div className="btn btn-error btn-disabled">Недоступно</div>       
                </div>
                    <h2 className="card-title">{props.card.name}!</h2>
                    <p>Пассивный доход: {props.card.income}</p>
                    <p>Цена: {props.card.price}</p>
                    {props.card.depenedencies.map((dependency) => (
                        <p className="text-xs">Требуется: {dependency.id}, уровень: {dependency.level}</p>))
                    }
                    
                </div>
        </div>
    )
}   

export default ShopCardUnavailable