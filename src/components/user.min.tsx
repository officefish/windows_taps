import { FC } from "react"

interface IUserMinProps {
    photoUrl: string
    fullname: string
}

const UserMin:FC<IUserMinProps> = (props) => {
    const { photoUrl, fullname } = props
    return (
        <div className="flex flex-row h-full">
            <div className="avatar">
                <div className="mask mask-squircle w-12">
                    <img src={photoUrl} />
                </div>
            </div>
            <div className="flex h-full justify-start items-center ml-4">{fullname}</div>
        </div>
       
        
    )
}

export default UserMin