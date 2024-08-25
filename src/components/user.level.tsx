import { FC, SyntheticEvent } from "react"

interface IUserEnergyProps {
    progress: number
    level: number
    onClick: () => void
}

const UserLevel:FC<IUserEnergyProps> = (props) => {
    const { progress, level, onClick } = props

    const onLevelClick = (e: SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault()
        onClick()
    }

    return (
        <div className="flex flex-row gap-4 h-full items-center btn" onClick={onLevelClick}>
            <progress className="progress progress-accent w-24" value={progress} max="100"></progress>
            <div className="text-accent">{getRoleByLevel(level)}</div>
        </div>        
    )
}
export default UserLevel

const getRoleByLevel = (level: number) => {
    switch (level) {
        case 1:
            return "Листовщик"
        case 2:
            return "Продавец"
        case 3:
            return "Администратор"
        default:
            return "Листовщик"
    }   
}