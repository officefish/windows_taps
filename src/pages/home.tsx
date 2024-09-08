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
//import { useUpdateBalance } from "@/hooks/api/useUpdateBalance";
import { enqueueSnackbar } from "notistack";
import Auth from "@/services/api/auth";


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

  const { player } = useUserStore()


  const { farm } = useFarm(apiFetch)
  //const { updateBalance } = useUpdateBalance(apiFetch)

  useEffect(() => {
    if (player) {
      console.log('player data from store! :', player)
      console.log(player)
    }
  }, [player])

  useEffect(() => {
      setPage(Page.HOME)
  }, [setPage])

  //const [balance, ] = useState(player?.balance || 100)
  //const [energy, ] = useState(player?.energyLatest || 100)
  
  const handleClick = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault()
    farm({ energy: 1, money: 1 })
    //setBalance(balance + 1)
    //let newEnergy = energy - 1
    //if (newEnergy < 0) newEnergy = 0
    //setEnergy(newEnergy)
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
    
    const updateEnergy = async () => {
      try {
        const response = await fetch(`https://d616-5-18-176-212.ngrok-free.app/api/v1/player/energy`, 
        {
        body: JSON.stringify({ energy: 0 }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
			// 'UserId': String(window.Telegram?.WebApp?.initDataUnsafe?.user?.id) || "0",
             ...(Auth.accessToken ? {
                 "Authorization": "Bearer " + Auth.accessToken
             } : {})
            },
        });
        const data = await response.json();
        console.log(data)

        //const res = await apiFetch('/player/balance', 'GET', null, enqueueSnackbar);
        //console.log(res)
        //if (res.balance) {
        //  updatePlayerBalance(res.balance)
        //}
        
      } catch (error: any) {
        //console.error('Error during login:', error);
        //let message = error?.message || 'Unknown';
        //enqueueSnackbar(`Error during login: ${error.message}`, { variant: 'info' });
        enqueueSnackbar(`Error during update energy: ${error}`, { variant: 'error' });
      } finally {
      }
    }
    // Set up the interval to run the updateStats function every 5 seconds (5000ms)
    const intervalId = setInterval(updateEnergy, 10000); 
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