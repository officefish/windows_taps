import ShopCard from "@/components/card";
import CardDialog from "@/components/dialogs/card.dialog";
import { useSiteStore } from "@/providers/store";
import { IShopCard, Page } from "@/types";
import { FC, PropsWithChildren, useEffect, useState } from "react";

const url = "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"

const categories = [
    {
        title: "Ум",
        cards: [
            {
                saled: true,
                blocked: false,
                income: 100,
                title: "Школа",
                price: 100,
                imgUrl: "shop/school.jpg",
                level: 1
            },
            {
                saled: false,
                blocked: false,
                income: 200,
                title: "Университет",
                price: 200,
                imgUrl: "shop/university.jpg",
                level: 1
            },
            {
                saled: false,
                blocked: false,
                income: 200,
                title: "Друзья",
                price: 200,
                imgUrl: "shop/friends.jpg",
                level: 1
            },
        ]
    },
    {
        title: "Физуха",
        cards: [
            {
                saled: true,
                blocked: false,
                income: 100,
                title: "Зарядка",
                price: 100,
                imgUrl: "shop/fitness.jpg",
                level: 1
            },
            {
                saled: false,
                blocked: false,
                income: 200,
                title: "Тренажерный зал",
                price: 200,
                imgUrl: "shop/fitness-room.jpg",
                level: 1
            },
        ]
    },
    {
        title: "Одежда",
        cards: [
            {
                saled: true,
                blocked: false,
                income: 100,
                title: "Кепка",
                price: 100,
                imgUrl: "shop/cap.jpg",
                level: 1
            },
            {
                saled: false,
                blocked: false,
                income: 200,
                title: "Ветровка",
                price: 200,
                imgUrl: "shop/windbreaker.jpg",
                level: 1
            },
            {
                saled: false,
                blocked: false,
                income: 200,
                title: "Ботинки",
                price: 200,
                imgUrl: "shop/shoes.jpg",
                level: 1
            },
            {
                saled: false,
                blocked: true,
                income: 300,
                title: "Джинсы",
                price: 300,
                imgUrl: "shop/casual-jeans.jpg",
                level: 1,
                dependency: {
                    title: "Кепка",
                    level: 1
                }
            }
        ]
    },
]



const Shop: FC = () => {

  const { setPage } = useSiteStore()

  useEffect(() => {
      setPage(Page.SHOP)
  }, [setPage])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [cards, setCards] = useState<IShopCard[]>(categories[0].cards)

  const [currentCard, setCurrentCard] = useState<IShopCard>(cards[0])
  
  const handleBuy = (card: IShopCard) => {
      setCurrentCard(card)
      setIsDialogOpen(true)
  }

  const onBuyClick = () => {
    setIsDialogOpen(false)
  }

  const handleTabClick = (index: number) => {
    setTabIndex(index)
    setCards(categories[index].cards)
  }

  const [tabIndex, setTabIndex] = useState(0)


    return (
    <div className=" h-screen">
        <div>
            <h1 className="w-full text-center">Магазин</h1>
            <p className="w-full text-center">Уровень: Листовщик</p>
        </div>
        <Tabs>
            {categories.map((category, index) => (
                <div
                    key={index}
                    className={`
                        tab 
                        ${tabIndex === index 
                            ? "tab-active text-primary [--tab-bg:yellow] [--tab-border-color:orange]" 
                            : ""}`}
                    onClick={() => handleTabClick(index)}
                >
                    {category.title}
                </div>
            ))}
        </Tabs>
        <div className='grid grid-cols-2 bg-[yellow] gap-2 p-2 w-full'>
            {cards.map((card, index) => (
                <ShopCard data={card} key={index} handleBuy={handleBuy}/>
            ))}
        </div>
        <CardDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                card={currentCard} 
                onBuyClick={onBuyClick}            />
    </div>  
    )
}
export default Shop

const Tabs: FC<PropsWithChildren> = ({ children }) => {
    return (
      <>
        <div className="w-full grid mt-2 px-4">
          <div className="tabs z-10 tabs-lifted">
            {children}
          </div>
        </div>
      </>
    )
  }