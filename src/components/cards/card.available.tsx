import { useUserStore } from "@/providers/user"
import { IShopCard } from "@/types"
import { FC, SyntheticEvent, useEffect, useState } from "react"



interface IShopCardProps {
    card: IShopCard
    onCardClick: (card: IShopCard) => void
}

const ShopCardAvailable:FC<IShopCardProps> = (props) => {

    const { player } = useUserStore()
    
    const handleBuy = props.onCardClick

    const onBuyClick = (e:SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault()
        handleBuy(props.card)
    }

    const [available, setAvailable] = useState<boolean>(false)

    useEffect(() => {
        setAvailable((player?.balance || 0)  > props.card.price)
        console.log(player?.balance)
    }, [player?.balance])

    return (
        <div className={`card h-60 overflow-hidden image-full w-full z-0`}>
            <figure>
                <img
                    src={props.card.imageUrl}
                    alt="Shoes" />
            </figure>
            <div className={`card-body`}>
                <div className="card-actions justify-end">
                { available
                    ? <div className="btn btn-primary" onClick={onBuyClick}>Купить</div>   
                    : <div className="text-error">Недостаточно монет</div>  
                }
                </div>
                    <h2 className="card-title">{props.card.name}!</h2>
                    <p className="text-xs">Пассивный доход (за 10 урвоень): {props.card.income}</p>
                    <p>Цена: {props.card.price}</p>
            </div>
        </div>
    )
}   

export default ShopCardAvailable