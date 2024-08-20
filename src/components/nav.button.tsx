import { FC } from "react"
import { Link } from "react-router-dom"

interface INavButton {
    selected: boolean
    title: string
    to: string
}

const NavButton:FC<INavButton> = (props) => {
    const { selected, to,  title } = props
    return (
        <Link to={to}>
            <div className={`
                h-20 flex items-center justify-center 
                m-1 
                border-2 rounded-lg
                ${selected ? 'text-primary border-primary' : 'text-accent border-accent'}`
            }>{title}</div>
        </Link>
        
    )
}

export default NavButton