import ShopCard from "@/components/cards/card";
import BuyCardDialog from "@/components/dialogs/buy-card.dialog";
import UpgradeCardDialog from "@/components/dialogs/upgrade-card.dialog";
import { useBuyCard } from "@/hooks/api/useBuyCard";

import { useSiteStore } from "@/providers/store";
import { useUserStore } from "@/providers/user";
import apiFetch from "@/services/api";
import { ICategory, IShopCard, Page } from "@/types";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Shop: FC = () => {

  const { setPage } = useSiteStore()

  useEffect(() => {
      setPage(Page.SHOP)
  }, [setPage])

  const { shop } = useUserStore()

  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false)
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false)

  const [category, setCategory] = useState<ICategory>(shop[0])
  const [currentCard, setCurrentCard] = useState<IShopCard | null>(null)

  const { buyCard } = useBuyCard(apiFetch)
  
  const handleBuy = (card: IShopCard) => {
      setCurrentCard(card)
      setIsBuyDialogOpen(true)
  }

  const handleUpgrade = (card: IShopCard) => {
    setCurrentCard(card)
    setIsUpgradeDialogOpen(true)
}

  const navigate = useNavigate();

  const onBuyClick = () => {
    setIsBuyDialogOpen(false)
    buyCard(currentCard?.id as string)
    navigate('/shop')
  }

  const onUpgradeClick = () => {
    setIsUpgradeDialogOpen(false)
  }

  const handleTabClick = (index: number) => {
    setTabIndex(index)
    setCategory(shop[index])
  }

  const [tabIndex, setTabIndex] = useState(0)
  const [categories, setCategories] = useState<ICategory[]>([])

  useEffect(() => {
    setCategories(shop)
  }, [shop])

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
                    {category.name}
                </div>
            ))}
        </Tabs>
        <div className='grid grid-cols-2 bg-[yellow] gap-2 p-2 w-full'>
            {category.purchased.map((card, index) => (
                <ShopCard 
                card={card} 
                key={index} 
                handleBuy={handleBuy}
                handleUpgrade={handleUpgrade} 
                saled={true}
                blocked={false}
                />
            ))}
            {category.available.map((card, index) => (
                <ShopCard 
                card={card} 
                key={index} 
                handleBuy={handleBuy}
                handleUpgrade={handleUpgrade} 
                saled={false}
                blocked={false}
                />
            ))}
            {category.unavailable.map((card, index) => (
                <ShopCard 
                card={card} 
                key={index} 
                handleBuy={handleBuy}
                handleUpgrade={handleUpgrade} 
                saled={false}
                blocked={true}
                />
            ))}
        </div>
        <BuyCardDialog
            isOpen={isBuyDialogOpen}
            setIsOpen={setIsBuyDialogOpen}
            card={currentCard} 
            onBuyClick={onBuyClick}            
        />
        <UpgradeCardDialog
            isOpen={isUpgradeDialogOpen}
            setIsOpen={setIsUpgradeDialogOpen}
            card={currentCard} 
            onBuyClick={onUpgradeClick}            
        />
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