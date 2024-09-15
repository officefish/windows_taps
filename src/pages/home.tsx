import DailyDialog from "@/components/dialogs/daily.dialog";
import UserBalance from "@/components/user.balance";
import UserLevel from "@/components/user.level";
import UserIncome from "@/components/user.income";
import UserMin from "@/components/user.min";
import { useSiteStore } from "@/providers/store";
import { Page, RankType } from "@/types";
import { FC, useCallback, useEffect, useState } from "react";
import RatingDialog from "@/components/dialogs/rating.dialog";
import { useNavigate } from "react-router-dom"
import { useUserStore } from "@/providers/user";
import { getRankNameByRank } from "@/services/game.service";
// import { useFarm } from "@/hooks/api/useFarmMoney";
// import { apiFetch } from "@/services/api"
// import { useUpdateEnergy } from "@/hooks/api/useUpdateEnergy";
// import useUpdateIncome from "@/hooks/api/useUpdateIncome";
import useTapper from "@/hooks/useTapper";


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

  const { setPage } = useSiteStore();
  const navigate = useNavigate();

  const { player, dailyQuest } = useUserStore();

  //const { updateEnergy } = useUpdateEnergy(apiFetch);

  // Убедитесь, что вызывается один раз при монтировании
  useEffect(() => {
    setPage(Page.HOME);
  }, [setPage]);

  // Мемоизация обработчика клика
  // const handleClick = useCallback((e: SyntheticEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   farm({ energy: 1, money: 1 });
  // }, [farm]);

  const [isDailyDialogOpen, setIsDailyDialogOpen] = useState(false);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);

  const handleConfirm = useCallback(() => {}, []);

  const handleDaily = useCallback(() => {
    setIsDailyDialogOpen(true);
  }, []);

  const handleMiniGame = useCallback(() => {
    navigate("/puzzle");
  }, [navigate]);

  const handleLevelClick = useCallback(() => {
    setIsRatingDialogOpen(true);
  }, []);

  // const updateEnergyInterval = useCallback((eLatest: number, eMax: number) => {
  //   if (eLatest < eMax) {
  //     updateEnergy();
  //   }
  // }, [updateEnergy]);

  // // Интервал для обновления энергии
  // useEffect(() => {
  //   const intervalId = setInterval(() => 
  //     updateEnergyInterval(player?.energyLatest || 0, player?.energyMax || 300), 
  //     2000
  //   );

  //   // Очистка интервала при размонтировании
  //   return () => clearInterval(intervalId);
  // }, [player?.energyLatest, player?.energyMax, updateEnergyInterval]);

  // const { updateIncome } = useUpdateIncome(apiFetch);

  // // Интервал для обновления дохода
  // useEffect(() => {
  //   const intervalId = setInterval(updateIncome, 10000);

  //   // Очистка интервала при размонтировании
  //   return () => clearInterval(intervalId);
  // }, [updateIncome]);

  const { 
    balance,
    energy, 
    handleTouch, 
    handleDown, 
    onDestroy
  } = useTapper();

  useEffect(() => {
    return () => { 
      onDestroy() 
    };
  }, []);

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
              <div className="text-primary text-lg">{getRankNameByRank(player?.rank || RankType.SHEETER)}</div>
              <div className="btn btn-secondary btn-sm" onClick={handleMiniGame}>Миниигра</div>
            </div>
            <div className="flex flex-row justify-between items-center gap-2 mt-2">
              <div className="col-span-2 flex justify-end">
                <UserBalance balance={balance} />
              </div>
            </div>
            <div className="w-64 h-64 cursor-pointer btn rounded-full mt-4" 
            onTouchEnd={handleTouch} onMouseDown={handleDown}
            >
              <img className="w-full h-full rounded-full" src="clicker-3.jpg" />
            </div>
          </div>
        </div>
       
          <div className="flex flex-row gap-2 items-center mt-4 w-full justify-center">
            <img className="w-12 h-12 bg-accent" src="./energy-svg.svg" />
            <div className="h-full flex flex-col items-center justify-center gap-2">
              <div className="w-full text-accent text-center">{energy} / {player?.energyMax}</div>
              <progress className="progress progress-accent w-56 ml-4" value={energy} max={player?.energyMax}></progress>
            </div>
        </div>
      </div>
    </div>
    <DailyDialog
      isOpen={isDailyDialogOpen}
      setIsOpen={setIsDailyDialogOpen}
      onConfirm={handleConfirm} 
      dailyQuestData={dailyQuest}
      />
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