import { mockFriends } from "@/mocks/friends";
import { useSiteStore } from "@/providers/store";
import { IUser, Page } from "@/types";
import { FC, useEffect, useState } from "react";


const Friends: FC = () => {

  const { setPage } = useSiteStore()

  const [friends,] = useState(mockFriends)


  useEffect(() => {
      setPage(Page.FRIENDS)
  }, [setPage])

  //const position = useBackgroundMover(7); // Adjust multiplier as needed

//   const backgroundStyle = {
//     backgroundPosition: `${position.x}% ${position.y}%`,
//   };

    const [refferal,] = useState("link/ref=userandranders03Hf72nf5Nfa941412") 
  
    return (
      <div className="h-screen px-4">
        <FriendsHeader referral={refferal} />
        <div className="spacer"></div>
        <FriendsNav numFriends={4} numLine={1} />
        <div className="spacer"></div>
        {friends.length > 0 && <FriendsList friends={friends} />}
        {!friends.length && <Invite />}
  </div>)
}
export default Friends

interface IFriendsHeaderProps {
  referral: string
}

const FriendsHeader:FC<IFriendsHeaderProps> = (props) => {
  const {referral} = props
  return (
    <>
        <div>
          <h1 className="w-full text-center">Друзья</h1>
        </div>
        <div className='gap-2 bg-accent rounded-lg mt-4 py-4'>
          <h5 className="pb-4 col-span-5 text-center text-base-100 font-bold text-xl">Ссылка для друзей.</h5>
          <div className="flex flex-row gap-2 mx-2 justify-between">
            <input className="mx-4 input px-8 w-[70%] md:w-[90%]" type="text" value={referral} onChange={()=>referral}></input>
            <div className="flex flex-row gap-2 items-center justify-center mx-2">
              <div className="btn">
                <img className="w-[26px] h-[26px]" src="/icons/png/tabler_copy.png" alt="copy referal" />
              </div>
              <div className="btn mr-2">
                <img className="w-[26px] h-[26px]" src="/icons/png/tabler_share.png" alt="share referal" />
              </div>
            </div>
          </div>
        </div>
    </>
    
  )
}

interface IFriendsNavProps {
  numFriends: number
  numLine: number
} 

const FriendsNav: FC<IFriendsNavProps> = (props) => {

  const {numFriends, numLine} = props

  return (
    <div className="
    mt-2 
    bg-primary 
    px-4 
    py-4
    w-full 
    flex flex-row justify-between items-center
    rounded-md
    ">
        <div className="btn flex items-center btn-primary">
            <img className="w-[26px] h-[26px]" src="/icons/png/arrows_left_fill.png" alt="left arrows" />
        </div>
        <div className="flex flex-col pt-2 text-base-100 font-bold gap-2">
          <div className="w-full text-2xl text-center">Друзья: {numFriends}</div>
          <div className="w-full txt-lg text-center">Линия {numLine}</div>
        </div>
        <div className="btn flex items-center btn-primary">
           <img className="w-[26px] h-[26px]" src="/icons/png/arrows_right_fill.png" alt="right arrows" />
        </div>
    </div>
  )
}

interface UserItemProps {
  user: IUser
}

interface FriendsListProps {
  friends: IUser[]
}   

const FriendsList: FC<FriendsListProps> = (props) => {
  const { friends } = props
  return <div className="mt-4 w-full flex flex-col gap-4 z-0">
      {friends.map((friend, i) => <UserItem key={i} user={friend} />)}
  </div>
}

const UserItem: FC<UserItemProps> = (props) => {
  const { user } = props
  
  return <div className="w-full flex flex-row justify-between h-[52px]">
      <div className="flex flex-row gap-2 items-center">
          <img className="w-[36px] h-[36px] rounded-full" src={user.avatar} alt={user.name} />
          <div className="flex flex-col">
              <div className="sm-user-name">{user.name}</div>
              <div className="sm-user-status">
                  {user.active ? `Active · ${user.energyPerSecond}%` : `Inactive · ${user.balance} Tap`}
              </div>
          </div>
      </div>
      <div className="flex items-center justify-center">
          <div className={`user-bonus ${user.active ? 'bg-[#696969]' : 'bg-[#886867]'} `}>+{user.bonus}</div>
      </div>
  </div>
}

const Invite = () => {

  return (
      <div className="w-full h-[40%] flex flex-col items-center justify-center gap-4">
          <div className="invite-title">Nothing here...</div>
          <div className="btn flex flex-row gap-1">
              Приглашайте друзей
              <img className="w-[26px] h-[26px]" src="/icons/png/tabler_share_black.png" alt="share referal"></img>
          </div>
      </div>
      )
}

