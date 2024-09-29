import { FC } from "react"
import { Link } from "react-router-dom"

interface INavButton {
    selected: boolean
    title: string
    to: string
    index: number
}

const NavButton:FC<INavButton> = (props) => {
    const { selected, to,  title, index } = props

    const srcByIndex = (index: number) => {
        switch(index) {
            case 0: return '/nav/home.png'
            case 1: return '/nav/shop.png'
            case 2: return '/nav/tasks.png'
            case 3: return '/nav/friends.png'
            case 4: return '/nav/offer.png'
        }
    }

    return (
        <Link to={to}>
            <div className={`
                w-full h-full flex items-center justify-center flex-col
                nav-title 
                text-white`
            }>
                <div className={`
                    w-12 h-12 flex items-center justify-center flex-col gap-1
                    ${selected ? 'opacity-100' : 'opacity-40'}`}>
                    <img src={srcByIndex(index)} alt="stats currency" />
                    {title}
                </div >
               <div className={`
                nav-line
                ${selected ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>
        </Link>
        
    )
}

export default NavButton