import ShopCard from "@/components/card";
import CardDialog from "@/components/dialogs/card.dialog";
import { useSiteStore } from "@/providers/store";
import { IShopCard, Page } from "@/types";
import { FC, useEffect, useState } from "react";

const url = "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"

const cards = [
    {
        saled: true,
        blocked: false,
        income: 100,
        title: "Ботинки",
        price: 100,
        imgUrl: url,
        level: 1
    },
    {
        saled: false,
        blocked: false,
        income: 200,
        title: "Сумка",
        price: 200,
        imgUrl: url,
        level: 1
    },
    {
        saled: false,
        blocked: false,
        income: 200,
        title: "Ветровка",
        price: 200,
        imgUrl: url,
        level: 1
    },
    {
        saled: false,
        blocked: true,
        income: 300,
        title: "Шлем",
        price: 300,
        imgUrl: url,
        level: 1,
        dependency: {
            title: "Ветровка",
            level: 1
        }
    }

] as IShopCard[]

const Shop: FC = () => {

  const { setPage } = useSiteStore()

  useEffect(() => {
      setPage(Page.SHOP)
  }, [setPage])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
 const [currentCard, setCurrentCard] = useState<IShopCard>(cards[0])
  
  const handleBuy = (card: IShopCard) => {
      setCurrentCard(card)
      setIsDialogOpen(true)
  }

    return (
    <div className="overflow-y-scroll h-screen">
        <div>
            <h1 className="w-full text-center">Магазин</h1>
        </div>
       <div className='grid grid-cols-2'>
            {cards.map((card, index) => (
                <ShopCard data={card} key={index} handleBuy={handleBuy}/>
            ))}
        </div>
        <CardDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                card={currentCard} 
                onBuyClick={function (): void {
                    throw new Error("Function not implemented.");
                } }            />
    </div>  
    )
}
export default Shop