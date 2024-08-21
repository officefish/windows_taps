import ShopCard from "@/components/card";
import { useSiteStore } from "@/providers/store";
import { IShopCard, Page } from "@/types";
import { FC, useEffect } from "react";

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

  //const position = useBackgroundMover(7); // Adjust multiplier as needed

//   const backgroundStyle = {
//     backgroundPosition: `${position.x}% ${position.y}%`,
//   };
  

    return (
    <div className="overflow-y-scroll h-screen">
        <div>
            <h1 className="w-full text-center">Магазин</h1>
        </div>
       <div className='grid grid-cols-2'>
                {cards.map((card, index) => (
                    <ShopCard data={card} key={index} />
                ))}
        </div>
    </div>  
    )
}
export default Shop