import BoostDialog from "@/components/dialogs/boost.content";
import UserBalance from "@/components/user.balance";
import UserLevel from "@/components/user.level";
import UserIncome from "@/components/user.income";
import UserMin from "@/components/user.min";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import RatingDialog from "@/components/dialogs/rating.dialog";

const bestUsers = [
  {
    name: 'Сергей Иноземцев',
    photoUrl: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
    income: 1400
  },
  {
    name: 'Егор Летов',
    photoUrl: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
    income: 1200
  },
  {
    name: 'Елена прекрасная',
    photoUrl: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
    income: 1000
  },

]

const Home: FC = () => {

  const { setPage } = useSiteStore()

  useEffect(() => {
      setPage(Page.HOME)
  }, [setPage])

  const user = {
    name: 'Сергей Иноземцев',
    photoUrl: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
  }

  const [balance, setBalance] = useState(100)
  const [energy, setEnergy] = useState(100)
  
  const handleClick = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault()
    setBalance(balance + 1)
    let newEnergy = energy - 1
    if (newEnergy < 0) newEnergy = 0
    setEnergy(newEnergy)
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)
   
   const handleConfirm = () => {}

   const handleBoost = () => {
    setIsDialogOpen(true)
   }

   const handleLevelClick = () => {
    setIsRatingDialogOpen(true)
   }

    return (
    <div className='w-full px-4 text-left'>
      <div className="flex w-full gap-4 items-center justify-between">
          <UserMin fullname={user.name} 
          photoUrl={user.photoUrl} />
          <div className="text-right flex items-start justify-end">ключи??</div>
      </div>
        <div className="flex flex-row items-center justify-between w-full">
          <UserLevel level={1} progress={35} onClick={handleLevelClick}/>
          <UserIncome income={0} />
        </div>
      <div>
      <div className="mt-4 w-full">
        <div className="flex items-center justify-center w-full">
          <div className="rounded-3xl border-2 border-primary h-full w-96 flex flex-col items-center justify-center py-2">
            <div className="flex flex-row justify-between items-center gap-2 w-full px-4">
              <div className="btn btn-secondary" onClick={handleBoost}>Буст 1</div>
              <div className="btn btn-secondary" onClick={handleBoost}>Буст 2</div>
            </div>
            <div className="flex flex-row justify-between items-center gap-2 mt-2">
              <div className="col-span-2 flex justify-end">
                <UserBalance balance={balance} />
              </div>
            </div>
            <div className="w-64 h-64 cursor-pointer btn rounded-full mt-4" onClick={handleClick}>
              <img className="w-full h-full rounded-full" src="clicker-3.jpg" />
            </div>
          </div>
        </div>
       
          <div className="flex flex-row gap-2 items-center mt-4 w-full justify-center">
            <img className="w-12 h-12 bg-accent" src="./energy-svg.svg" />
            <div className="h-full flex flex-col items-center justify-center gap-2">
              <div className="w-full text-accent text-center">{energy} / 1000</div>
              <progress className="progress progress-accent w-56 ml-4" value="40" max="100"></progress>
            </div>
        </div>
      </div>
    </div>
    <BoostDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                onConfirm={handleConfirm} />
     <RatingDialog
                isOpen={isRatingDialogOpen}
                setIsOpen={setIsRatingDialogOpen}
                level={1}
                income={0}
                bestUsers={bestUsers}
                /> 

   </div>)
}
export default Home