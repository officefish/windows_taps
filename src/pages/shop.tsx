import ShopCard from "@/components/cards/card";
import BuyCardDialog from "@/components/dialogs/buy-card.dialog";
import UpgradeCardDialog from "@/components/dialogs/upgrade-card.dialog";
import { useBuyCard } from "@/hooks/api/useBuyCard";
import { useUpgradeCard } from "@/hooks/api/useUpgradeCard";

import { useSiteStore } from "@/providers/store";
import { useUserStore } from "@/providers/user";
import { apiFetch } from "@/services/api";
import { ICategory, IShopCard, Page } from "@/types";
import React from "react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

const Shop: FC = () => {
  const { setPage } = useSiteStore();

  useEffect(() => {
    setPage(Page.SHOP);
  }, [setPage]);

  const { shop } = useUserStore();

  // Состояния для управления диалогами и текущей карточкой
  const [dialogState, setDialogState] = useState({
    isBuyDialogOpen: false,
    isUpgradeDialogOpen: false,
  });

  const [currentCard, setCurrentCard] = useState<IShopCard | null>(null);
  const [category, setCategory] = useState<ICategory>(shop[0]);
  const [tabIndex, setTabIndex] = useState(0);

  const { buyCard } = useBuyCard(apiFetch);
  const { upgradeCard } = useUpgradeCard(apiFetch);

  // Мемоизация функций для предотвращения лишних перерисовок
  const handleBuy = useCallback((card: IShopCard) => {
    setCurrentCard(card);
    setDialogState((prevState) => ({ ...prevState, isBuyDialogOpen: true }));
  }, []);

  const handleUpgrade = useCallback((card: IShopCard) => {
    setCurrentCard(card);
    setDialogState((prevState) => ({ ...prevState, isUpgradeDialogOpen: true }));
  }, []);

  const onBuyClick = useCallback(() => {
    setDialogState((prevState) => ({ ...prevState, isBuyDialogOpen: false }));
    if (currentCard) buyCard(currentCard.id);
  }, [buyCard, currentCard]);

  const onUpgradeClick = useCallback(() => {
    setDialogState((prevState) => ({ ...prevState, isUpgradeDialogOpen: false }));
    if (currentCard) upgradeCard(currentCard.id);
  }, [upgradeCard, currentCard]);

  const handleTabClick = useCallback((index: number) => {
    setTabIndex(index);
    setCategory(shop[index]);
  }, [shop]);

  // Мемоизация для уменьшения количества ререндеров
  const renderedShopCards = useMemo(() => (
    <>
      {category.purchased.map((card, index) => (
        <ShopCard
          key={index}
          card={card}
          handleBuy={handleBuy}
          handleUpgrade={handleUpgrade}
          saled={true}
          blocked={false}
        />
      ))}
      {category.available.map((card, index) => (
        <ShopCard
          key={index}
          card={card}
          handleBuy={handleBuy}
          handleUpgrade={handleUpgrade}
          saled={false}
          blocked={false}
        />
      ))}
      {category.unavailable.map((card, index) => (
        <ShopCard
          key={index}
          card={card}
          handleBuy={handleBuy}
          handleUpgrade={handleUpgrade}
          saled={false}
          blocked={true}
        />
      ))}
    </>
  ), [category, handleBuy, handleUpgrade]);

  return (
    <div className="h-screen">
      <div>
        <h1 className="w-full text-center">Магазин</h1>
        <p className="w-full text-center">Уровень: Листовщик</p>
      </div>
      <Tabs tabIndex={tabIndex} handleTabClick={handleTabClick} shop={shop} />
      <div className="grid grid-cols-2 bg-[yellow] gap-2 p-2 w-full">
        {renderedShopCards}
      </div>
      <BuyCardDialog
        isOpen={dialogState.isBuyDialogOpen}
        setIsOpen={(isOpen) => setDialogState((prevState) => ({ ...prevState, isBuyDialogOpen: isOpen }))}
        card={currentCard}
        onBuyClick={onBuyClick}
      />
      <UpgradeCardDialog
        isOpen={dialogState.isUpgradeDialogOpen}
        setIsOpen={(isOpen) => setDialogState((prevState) => ({ ...prevState, isUpgradeDialogOpen: isOpen }))}
        card={currentCard}
        onBuyClick={onUpgradeClick}
      />
    </div>
  );
};

export default Shop;

// Компонент Tabs вынесен для улучшения читаемости и гибкости
const Tabs: FC<{ tabIndex: number, handleTabClick: (index: number) => void, shop: ICategory[] }> = React.memo(({ tabIndex, handleTabClick, shop }) => {
  return (
    <div className="w-full grid mt-2 px-4">
      <div className="tabs z-10 tabs-lifted">
        {shop.map((category, index) => (
          <div
            key={index}
            className={`
              tab 
              ${tabIndex === index
                ? "tab-active text-primary [--tab-bg:yellow] [--tab-border-color:orange]"
                : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {category.categoryName}
          </div>
        ))}
      </div>
    </div>
  );
});

// const Shop: FC = () => {

//   const { setPage } = useSiteStore()

//   useEffect(() => {
//       setPage(Page.SHOP)
//   }, [setPage])

//   const { shop } = useUserStore()

//   const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false)
//   const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false)

//   const [category, setCategory] = useState<ICategory>(shop[0])
//   const [currentCard, setCurrentCard] = useState<IShopCard | null>(null)

//   const { buyCard } = useBuyCard(apiFetch)
//   const { upgradeCard } = useUpgradeCard(apiFetch)
  
//   const handleBuy = (card: IShopCard) => {
//       setCurrentCard(card)
//       setIsBuyDialogOpen(true)
//   }

//   const handleUpgrade = (card: IShopCard) => {
//     setCurrentCard(card)
//     setIsUpgradeDialogOpen(true)
// }

//   const onBuyClick = () => {
//     setIsBuyDialogOpen(false)
//     buyCard(currentCard?.id as string)
//   }

//   const onUpgradeClick = () => {
//     setIsUpgradeDialogOpen(false)
//     upgradeCard(currentCard?.id as string)
//   }

//   const handleTabClick = (index: number) => {
//     setTabIndex(index)
//     setCategory(shop[index])
//   }

//   const [tabIndex, setTabIndex] = useState(0)
 

//     return (
//     <div className=" h-screen">
//         <div>
//             <h1 className="w-full text-center">Магазин</h1>
//             <p className="w-full text-center">Уровень: Листовщик</p>
//         </div>
//         <Tabs>
//             {shop.map((category, index) => (
//                 <div
//                     key={index}
//                     className={`
//                         tab 
//                         ${tabIndex === index 
//                             ? "tab-active text-primary [--tab-bg:yellow] [--tab-border-color:orange]" 
//                             : ""}`}
//                     onClick={() => handleTabClick(index)}
//                 >
//                     {category.categoryName}
//                 </div>
//             ))}
//         </Tabs>
//         <div className='grid grid-cols-2 bg-[yellow] gap-2 p-2 w-full'>
//             {category.purchased.map((card, index) => (
//                 <ShopCard 
//                 card={card} 
//                 key={index} 
//                 handleBuy={handleBuy}
//                 handleUpgrade={handleUpgrade} 
//                 saled={true}
//                 blocked={false}
//                 />
//             ))}
//             {category.available.map((card, index) => (
//                 <ShopCard 
//                 card={card} 
//                 key={index} 
//                 handleBuy={handleBuy}
//                 handleUpgrade={handleUpgrade} 
//                 saled={false}
//                 blocked={false}
//                 />
//             ))}
//             {category.unavailable.map((card, index) => (
//                 <ShopCard 
//                 card={card} 
//                 key={index} 
//                 handleBuy={handleBuy}
//                 handleUpgrade={handleUpgrade} 
//                 saled={false}
//                 blocked={true}
//                 />
//             ))}
//         </div>
//         <BuyCardDialog
//             isOpen={isBuyDialogOpen}
//             setIsOpen={setIsBuyDialogOpen}
//             card={currentCard} 
//             onBuyClick={onBuyClick}            
//         />
//         <UpgradeCardDialog
//             isOpen={isUpgradeDialogOpen}
//             setIsOpen={setIsUpgradeDialogOpen}
//             card={currentCard} 
//             onBuyClick={onUpgradeClick}            
//         />
//     </div>  
//     )
// }
// export default Shop

// const Tabs: FC<PropsWithChildren> = ({ children }) => {
//     return (
//       <>
//         <div className="w-full grid mt-2 px-4">
//           <div className="tabs z-10 tabs-lifted">
//             {children}
//           </div>
//         </div>
//       </>
//     )
//   }