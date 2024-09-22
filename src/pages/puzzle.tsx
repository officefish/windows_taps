import { useState, useEffect, useRef  } from 'react'
import Tile from "@/puzzle/tile"
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/providers/user';
//import './Puzzle.css';

const shuffleArray = (array: number[]): number[] => {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}


const Puzzle: React.FC = () => {
    const [tiles, setTiles] = useState<number[]>([])

    const [timeLeft, setTimeLeft] = useState<number>(180); // 180 seconds = 3 minutes
    const [isGameActive, setIsGameActive] = useState<boolean>(true);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate()

    const { minigame } = useUserStore()

    useEffect(() => {
      console.log(minigame)
    }, [])
  
    useEffect(() => {
      let initialTiles = Array.from({ length: 16 }, (_, i) => i);
      initialTiles = shuffleArray(initialTiles);
      setTiles(initialTiles)

      // Start the timer when the game starts
    timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            setIsGameActive(false); // End the game when time runs out
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
  
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }, [])
  
    const handleClick = (index: number) => {
      const newTiles = [...tiles];
      const emptyIndex = newTiles.indexOf(0);
      
      const isAdjacent = (index === emptyIndex - 1 && emptyIndex % 4 !== 0) ||
                         (index === emptyIndex + 1 && index % 4 !== 0) ||
                         index === emptyIndex - 4 || 
                         index === emptyIndex + 4;
      
      if (isAdjacent) {
        newTiles[emptyIndex] = newTiles[index];
        newTiles[index] = 0;
        setTiles(newTiles);
      }
    };
  
    const isSolved = () => {
      for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i] !== i + 1) return false;
      }
      return true;
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      };

    const handleBack = () => {
        navigate("/")
      };
    
  
    return (
      <div className='flex w-full items-center justify-center flex-col gap-4 p-4'>
        <div className="puzzle">
          {tiles.map((number, index) => (
            <Tile
              key={index}
              number={number}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4 w-full items-center justify-center">
            <p className='text-3xl'>Осталось времени: {formatTime(timeLeft)}</p>
            {isSolved() && <p className="congrats">Congratulations! You solved the puzzle!</p>}
            {!isGameActive && !isSolved() && <p className="game-over">Time's up! Game over!</p>}
        <div className="btn btn-secondary" onClick={handleBack}>Вернуться</div>
      </div>
      </div>
    );
  };
  
  export default Puzzle;