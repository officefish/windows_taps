import { FC } from "react"

interface ITileProps {
    number: number
    onClick: () => void
}

const Tile:FC<ITileProps> = (props) => {
    const { number, onClick } = props
    return (
    <button className={`tile ${number === 0 ? 'empty' : ''}`} onClick={onClick}>
      {number !== 0 && number}
    </button>
  );
}

export default Tile