import { useEffect  } from 'react'
//import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/providers/user';
import PuzzleMinigame from '@/components/puzzle.minigame';
import { useLoseMinigame } from '@/hooks/api/useLoseMinigame';
import { apiFetch } from '@/services/api';

const Puzzle: React.FC = () => {
    
  const { minigame } = useUserStore()
  const { loseMinigame } = useLoseMinigame(apiFetch)

  useEffect(() => {
    console.log(minigame)
  }, [])
  

  const handleWin = () => {
    //
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