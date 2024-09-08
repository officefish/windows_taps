import BoostDialog from "@/components/dialogs/boost.content";
import UserBalance from "@/components/user.balance";
import UserLevel from "@/components/user.level";
import UserIncome from "@/components/user.income";
import UserMin from "@/components/user.min";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import RatingDialog from "@/components/dialogs/rating.dialog";
import { useNavigate } from "react-router-dom"
import { useUserStore } from "@/providers/user";
import { getRankNameByRank } from "@/services/game.service";
import { useFarm } from "@/hooks/api/useFarmMoney";
import apiFetch from "@/services/api"
import { useUpdateEnergy } from "@/hooks/api/useUpdateEnergy";


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
  const navigate = useNavigate()

  const { player, dailyQuest } = useUserStore()

  useEffect(() => {
    if (dailyQuest) {
      console.log(dailyQuest)
    }
  }, [dailyQuest])

  const { farm } = useFarm(apiFetch)
  const { updateEnergy } = useUpdateEnergy(apiFetch)

  useEffect(() => {
      setPage(Page.HOME)
  }, [setPage])
  
  const handleClick = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault()
    farm({ energy: 1, money: 1 })
  }

  const [isBoostDialogOpen, setIsBoostDialogOpen] = useState(false)
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)
   
   const handleConfirm = () => {}

   const handleDaily = () => {
    setIsBoostDialogOpen(true)
   }

   const handleMiniGame = () => {
    navigate("/puzzle")
   }

   const handleLevelClick = () => {
    setIsRatingDialogOpen(true)
   }

   useEffect(() => {
    // Set up the interval to run the updateStats function every 5 seconds (5000ms)
    const intervalId = setInterval(updateEnergy, 2000); 
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [apiFetch]); // The effect depends on this method

    return (
    <div className='w-full px-4 text-left'>
      <div className="flex w-full gap-4 items-center justify-between">
          <UserMin fullname={`${player?.firstName} ${player?.lastName}`} 
          photoUrl={player?.imageUrl || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} />
          <div className="text-right flex items-start justify-end">ключи??</div>
      </div>
        <div className="flex flex-row items-center justify-between w-full">
          <UserLevel level={player?.levelId || 0} progress={35} onClick={handleLevelClick}/>
          <UserIncome income={player?.incomePerHour || 0} />
        </div>
      <div>
      <div className="mt-4 w-full">
        <div className="flex items-center justify-center w-full">
          <div className="rounded-3xl border-2 border-primary h-full w-96 flex flex-col items-center justify-center py-2">
            <div className="flex flex-row justify-between items-center gap-2 w-full px-4">
              <div className="btn btn-secondary btn-sm" onClick={handleDaily}>Дневная награда</div>
              <div className="text-primary text-lg">{getRankNameByRank(player?.rankId || 0)}</div>
              <div className="btn btn-secondary btn-sm" onClick={handleMiniGame}>Миниигра</div>
            </div>
            <div className="flex flex-row justify-between items-center gap-2 mt-2">
              <div className="col-span-2 flex justify-end">
                <UserBalance balance={player?.balance || 0} />
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
              <div className="w-full text-accent text-center">{player?.energyLatest} / {player?.energyMax}</div>
              <progress className="progress progress-accent w-56 ml-4" value={player?.energyLatest} max={player?.energyMax}></progress>
            </div>
        </div>
      </div>
    </div>
    <BoostDialog
                isOpen={isBoostDialogOpen}
                setIsOpen={setIsBoostDialogOpen}
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