import { IShopCard } from "@/types"
import { FC } from "react"



interface IShopCardProps {
    card: IShopCard
}

const ShopCardUnavailable:FC<IShopCardProps> = (props) => {
    
    return (
        <div className={`card h-60 overflow-hidden image-full w-full z-0`}>
            <figure>
                <img
                    src={props.card.imageUrl}
                    alt="Shoes" />
            </figure>
            <div className={`card-body`}>
                    <h2 className="card-title">{props.card.name}!</h2>
                    <p className="text-xs">Пассивный доход (за 10 урвоень): {props.card.income}</p>
                    <p>Цена: {props.card.price}</p>
                    {props.card && props.card.dependencies && 
                    <div className="flex flex-col gap-2">
                      Необходимо:
                      {props.card.dependencies.map((dependency, index) => (
                        <div className='font-bold text-md text-primary' key={index}>
                          {dependency.name}, уровень: {dependency.level}
                        </div>
                      ))}  
                    </div>}
                </div>
        </div>
    )
}   

export default ShopCardUnavailable