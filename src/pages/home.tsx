
import UserLevel from "@/components/user.level";
import UserMin from "@/components/user.min";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useUserStore } from "@/providers/user";

import useTapper from "@/hooks/useTapper";


const Home: FC = () => {

  const { setPage } = useSiteStore();
  const navigate = useNavigate();

  const { player } = useUserStore();

  useEffect(() => {
    setPage(Page.HOME);
  }, [setPage]);

  const handleDaily = useCallback(() => {
    navigate("/daily-quest");
  }, [navigate]);

  const handleMiniGame = useCallback(() => {
    navigate("/minigame");
  }, [navigate]);

  const handleLevelClick = useCallback(() => {
    //setIsRatingDialogOpen(true);
  }, []);

  const { 
    balance,
    energy, 
    handleTouch, 
    handleDown, 
    forceTick,
  } = useTapper();

  const [mounted, setMounted] = useState(false);

  const [fullname, setFullname] = useState<string | undefined>();

  useEffect(() => {
    setFullname(`${player?.firstName} ${player?.lastName}`);
  }, [player?.firstName, player?.lastName]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      forceTick();
    }
  }, [mounted, setMounted, forceTick]);

    return (
    <div className='w-full'>
      {/* Header */}
      <div className="flex w-full items-center justify-between h-16">
          <UserMin 
          fullname={fullname} 
          username={player?.username || ""}
          photoUrl={player?.imageUrl || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} 
          />
          <UserLevel level={player?.levelId || 0} progress={35} onClick={handleLevelClick}/>
      </div>
      {/* Content */}
      <div className="home-bg">
        {/* Game menu */}
        <div className="flex flex-row justify-stretch w-screen px-4 pt-4 gap-2">
          <div 
          className="btn-no-body flex flex-row gap-1 home-btn daily-bg items-center justify-start pl-2 w-[120px]"
          onClick={handleDaily}
          >
            <img className="w-8 h-8" src="/home/calendar.png" alt="daily" />
            Дневная 
            награда
          </div>
          <div 
          className="btn-no-body flex flex-row gap-1 home-btn minigame-bg items-center justify-start pl-2 w-[108px]"
          onClick={handleMiniGame}
          >
            <img className="w-8 h-8" src="/home/gamepad.png" alt="daily" />
            Мини 
            игра
          </div>
          <div className="btn-no-body flex flex-row gap-2 home-btn income-bg items-center justify-start pl-2 w-[180px]">
            <div className="flex flex-col h-full items-center justify-center pl-2">
              <div className="flex flex-row justify-stretch items-center gap-1 text-lg">
                {player?.incomePerHour}
                <img className="w-4 h-4" src="/home/question.png" alt="income per hour" />
              </div>
              Прибыль в час
            </div>
            <span className="home-spacer"></span>
            <div className="flex flex-col h-full items-center justify-center pr-4">
              <img className="w-6 h-6" src="/home/gear.png" alt="settings" />
            </div>
          </div>
        </div>
        {/* Balance  */}
        <div className="w-screen flex flex-row items-center justify-center gap-2 pt-4 balance-label">
            <img className="w-10 h-10" src="/home/coin.png" alt="balance" />
            <div>{balance}</div>
          </div>
        <div className="absolute home-gradient bottom-0"></div>  
        <div className="absolute bottom-28 px-2">


          <div className="flex flex-col items-center justify-center cursor-pointer pr-12"
           onTouchEnd={handleTouch} onMouseDown={handleDown}
          >
            <img className="w-[60%] h-[60%] sm:w-[100%] sm:h-[100%]" src="/skin/promoter.png" alt="coin" />
          </div>

          <div className="flex flex-row justify-between items-center w-screen pr-2">
            <div className="w-full h-16 flex flex-row items-center justify-between">
              <div className="flex flex-col items-start justify-center gap-1 pl-4">
                <div className="flex flex-row items-center justify-center gap-1 text-lg coin-power">
                  <img className="w-6 h-6" src="/home/coin.png" alt="coin power" />
                  + {player?.levelId}
                </div>
                <div className="flex fler-row items-start justify-center gap-1 text-white opacity-60">
                  Прибыль за час
                  <img className="w-6 h-6" src="/home/question.png" alt="income per hour" />                
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 pr-2">
                <img src="/home/energy.png" alt="" />
                <div className="home-energy">{energy}/{player?.energyMax}</div>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  //     <div className="mt-4 w-full">
  //       <div className="flex items-center justify-center w-full">
  //         <div className="rounded-3xl border-2 border-primary h-full w-96 flex flex-col items-center justify-center py-2">
  //           <div className="flex flex-row justify-between items-center gap-2 w-full px-4">
  //             <div className="btn btn-secondary btn-sm" onClick={handleDaily}>Дневная награда</div>
  //             <div className="text-primary text-lg">{getRankNameByRank(player?.rank || RankType.SHEETER)}</div>
  //             <div className="btn btn-secondary btn-sm" onClick={handleMiniGame}>Миниигра</div>
  //           </div>
  //           <div className="flex flex-row justify-between items-center gap-2 mt-2">
  //             <div className="col-span-2 flex justify-end">
  //               <UserBalance balance={balance} />
  //             </div>
  //           </div>
  //           <div className="w-64 h-64 cursor-pointer btn rounded-full mt-4" 
  //           onTouchEnd={handleTouch} onMouseDown={handleDown}
  //           >
  //             <img className="w-full h-full rounded-full" src="clicker-3.jpg" />
  //           </div>
  //         </div>
  //       </div>
       
  //         <div className="flex flex-row gap-2 items-center mt-4 w-full justify-center">
  //           <img className="w-12 h-12 bg-accent" src="./energy-svg.svg" />
  //           <div className="h-full flex flex-col items-center justify-center gap-2">
  //             <div className="w-full text-accent text-center">{energy} / {player?.energyMax}</div>
  //             <progress className="progress progress-accent w-56 ml-4" value={energy} max={player?.energyMax}></progress>
  //           </div>
  //       </div>
  //     </div>
  //   </div>
  // 
  //    <RatingDialog
  //     isOpen={isRatingDialogOpen}
  //     setIsOpen={setIsRatingDialogOpen}
  //     level={1}
  //     income={0}
  //     bestUsers={bestUsers}
  //     /> 

  //  </div>
  )
}
export default Home