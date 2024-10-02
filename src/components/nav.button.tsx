import { FriendsSvg, HomeSvg, OfferSvg, ShopSvg, TasksSvg } from "@/assets/svg"
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

    const svgByIndex = (index: number) => {
        switch(index) {
            case 0: return <HomeSvg />
            case 1: return <ShopSvg />
            case 2: return <TasksSvg />
            case 3: return <FriendsSvg />
            case 4: return <OfferSvg />
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
                    {svgByIndex(index)}
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