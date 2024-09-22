import { FC, useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/providers/user';
import PuzzleMinigame from '@/components/puzzle.minigame';
import { useLoseMinigame } from '@/hooks/api/useLoseMinigame';
import { apiFetch } from '@/services/api';
import { useWinMinigame } from '@/hooks/api/useWinMinigame';
import CountdownTimer from '@/components/countdown.timer';
import { useUpdateMinigame } from '@/hooks/api/useUpdateMinigame';

const Puzzle: React.FC = () => {
  
  const onLoseMinigame = () => {
    navigate('/')
  }

  const onWinMinigame = () => {
    navigate('/')
  }

  const { minigame } = useUserStore()
  const { loseMinigame } = useLoseMinigame(apiFetch, onLoseMinigame)
  const { winMinigame } = useWinMinigame(apiFetch, onWinMinigame) 

  const { updateMinigame } = useUpdateMinigame(apiFetch)
      
  useEffect(() => {
    updateMinigame()
  }, [])

  const [isBlocked, setIsBlocked] = useState(minigame.isBlocked)
  const [remainingTime, setRemainingTime] = useState(minigame.remainingTime)

  useEffect(() => {
    setIsBlocked(minigame.isBlocked)
    setRemainingTime(minigame.remainingTime)
  }, [minigame])

  const navigate = useNavigate()

  
  
  const handleWin = () => {
    winMinigame()
  }

  const handleLose = () => {
    loseMinigame(); //console
  }

  return (
      <>{ isBlocked 
        ? <MinigameBanner remainingTime={remainingTime} /> 
        : <PuzzleMinigame onWin={handleWin} onLose={handleLose}/>
      }</>
    )
  };
  
  export default Puzzle;
  interface ICountdownTimerProps {
    remainingTime: number
  }

  const MinigameBanner: FC<ICountdownTimerProps> = (props) => {
    const { remainingTime } = props

    const navigate  = useNavigate()

    const handleCLick = () => {
      navigate('/')
    }

    return <div className='flex w-full items-center justify-center flex-col gap-4 p-4'>
      <div className='text-3xl font-bold'>До следующей игры: </div>
      <CountdownTimer remainingTime={remainingTime} />
      <div className='btn btn-primary' onClick={handleCLick}>Вернуться</div>
    </div>
  }