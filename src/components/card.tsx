import { IShopCard } from "@/types"
import { FC } from "react"



interface IShopCardProps {
    data: IShopCard
}

const ShopCard:FC<IShopCardProps> = (props) => {
    const { 
        saled, 
        blocked, 
        income,
        title,
        price,
        imgUrl,
        dependency
    } = props.data
    return (
        <div className={`card 
        ${saled ? 'image-scaled' : 'image-full'} w-full p-2 z-0`}>
            <figure>
                <img
                    src={imgUrl}
                    alt="Shoes" />
            </figure>
            <div className={`card-body`}>
                <div className="card-actions justify-end">
                {blocked 
                    ? <div className="btn btn-error btn-disabled">Недоступно</div> 
                        : saled 
                            ? null 
                            : <div className="btn btn-primary">Купить</div>
                }
                </div>
                    <h2 className="card-title">{title}!</h2>
                    <p>Пассивный доход: {income}</p>
                    <p>Цена: {price}</p>
                    {blocked &&dependency && <p className="text-xs">Требуется: {dependency.title}, уровень: {dependency.level}</p>}
                </div>
        </div>
    )
}   

export default ShopCard