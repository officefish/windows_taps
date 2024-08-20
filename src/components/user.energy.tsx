import { FC } from "react"

interface IUserEnergyProps {
    progress: number
    level: string
}

const UserEnergy:FC<IUserEnergyProps> = (props) => {
    const { progress, level } = props
    return (
        <div className="flex flex-row gap-4 h-full items-center">
            <progress className="progress progress-accent w-56" value={progress} max="100"></progress>
            <div className="text-accent">{level}??</div>
        </div>
       
        
    )
}

export default UserEnergy