import { useEffect  } from 'react'
//import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/providers/user';
import PuzzleMinigame from '@/components/puzzle.minigame';
import { useLoseMinigame } from '@/hooks/api/useLoseMinigame';
import { apiFetch } from '@/services/api';
import { useWinMinigame } from '@/hooks/api/useWinMinigame';

const Puzzle: React.FC = () => {
    
  const { minigame } = useUserStore()
  const { loseMinigame } = useLoseMinigame(apiFetch)
  const { winMinigame } = useWinMinigame(apiFetch) 

  useEffect(() => {
    console.log(minigame)
  }, [])
  

  const handleWin = () => {
    winMinigame()
  }

  const handleLose = () => {
    loseMinigame(); //console
  }

  return (
      <>{ minigame.isBlocked ? <>Миниигра заблокирана!</> : 
        <PuzzleMinigame onWin={handleWin} onLose={handleLose}/>
      }</>
    )
  };
  
  export default Puzzle;