import { useSiteStore } from "@/providers/store";
import { useUserStore } from "@/providers/user";
import { IReferral, Page } from "@/types";
import { FC, useCallback, useEffect, useRef, useState } from "react";

const Friends: FC = () => {

  const { setPage } = useSiteStore()
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
      setPage(Page.FRIENDS)
  }, [setPage])

  const { 
    referralsPage, 
    referralsTotal,
    referralsCode,
    getRefferals,
  } = useUserStore()

  const [refferals, setReferrals] = useState<IReferral[]>()

  useEffect(() => {
    
    if (referralsTotal) {
      setReferrals(getRefferals(referralsPage)) //
    }

    if (referralsCode) {
      //console.log('code:', referralsCode)
      const message = 'Помоги еноту построить оконную империю!'
      const url = `https://t.me/Curt_Gedel_bot/windows_taps?startapp=referrerId=${referralsCode}`
      setReferralUrl(url)
      const tUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
      setTelegramUrl(tUrl)
    }

    
  }, [referralsPage, 
    referralsTotal,
    referralsCode,
    getRefferals])

    const [referralUrl, setReferralUrl] = useState("link/ref=userandranders03Hf72nf5Nfa941412") 
    const [telegramUrl, setTelegramUrl] = useState("")

    const handleShare = () => {
      window.open(telegramUrl, '_blank');
  };

  const handleCopy = () => {
    // Using the Clipboard API to copy text
    if (navigator.clipboard) {
      // Use Clipboard API if available
      navigator.clipboard.writeText(referralUrl)
        .then(() => {
          alert("Text copied to clipboard!");
        })
        .catch(err => {
          console.error("Error copying text: ", err);
          fallbackCopyText(referralUrl);
        });
    } else {
      // Fallback method
      fallbackCopyText(referralUrl);
    }
  }

  const fallbackCopyText = useCallback((text: string) => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.value = text;
      textArea.select();
      try {
        document.execCommand('copy');
        //alert("Text copied using fallback!");
      } catch (err) {
        //console.error('Fallback: Oops, unable to copy', err);
      }
    } else {
      //console.error('Fallback: Text area reference is null');
    }
  }, [])

  return (
    <>
      <div className="w-screen">
      <div className="friends-header py-4">
        Всегда выгоднее действовать сообща!
      </div>
      <div className="
      friends-description friends-slot 
      flex flex-row items-center justify-center 
      gap-2 px-2 mx-2
      h-[75px]
      ">
        <img src="/friends/gift.png" alt="gift" />
        Приглашай заговорщиков в фирму и собирай подогрев.
      </div>
      {refferals 
        ? <div>Нужна верстка!</div>
        : <div className="
          friends-description friends-slot 
          flex flex-row items-center justify-center 
          gap-2 px-8 mt-3
          opacity-70 h-[100px]
        ">
        Вам нужно проявлять больше активности, чтобы другие еноты последовали за вами.
        </div>
      }
      <div className="friends-devider mt-3 px-4">Список ваших друзей.</div>
      {refferals 
        ? <div>Нужна верстка!</div>
        : <div className="
        friends-description friends-slot 
        flex flex-row items-center justify-center 
        px-8 mt-3
        opacity-70 h-[75px]
        ">Пока еще никто не перешел по вашей ссылке.</div>
      }   
    </div>
      <div className='absolute bottom-24 mb-2 w-screen px-3 flex flex-row justify-between gap-3'>
        <div className='function-btn btn-no-body pt-6'
          onClick={handleShare}
          >Пригасить
        </div>
        <div className='function-btn btn-no-body !w-20 flex items-center justify-center'
          onClick={handleCopy}
          ><img className="w-10 h-10" src="/friends/copy.png" alt="copy" />
        </div>
      </div>   
    </>
  
  )

  /*
  
    return (
      
      <div className="h-screen px-4">
        <FriendsHeader referral={referralUrl} 
        onShare={handleShare} 
        onCopy={handleCopy}
        />
        <div className="spacer"></div>
        <FriendsNav numFriends={referralsTotal || 0} numLine={1} />
        <div className="spacer"></div>
        {refferals && <FriendsList friends={refferals || []} />}
        {!refferals && <Invite />}
         {/* Hidden textarea for fallback copy */
    /*}
     <  textarea
        ref={textAreaRef}
        className="invisible"
        style={{ position: 'absolute', left: '-9999px' }}
        readOnly
      />
      </div>
      
    )

    */
}
export default Friends

/*
interface IFriendsHeaderProps {
  referral: string
  onShare: () => void
  onCopy: () => void
}

const FriendsHeader:FC<IFriendsHeaderProps> = (props) => {
  const {referral, onShare, onCopy} = props
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
              <div className="btn" onClick={onCopy}>
                <img className="w-[26px] h-[26px]" src="/icons/png/tabler_copy.png" alt="copy referal" />
              </div>
              <div className="btn mr-2" onClick={onShare}>
                <img className="w-[26px] h-[26px]" src="/icons/png/tabler_share.png" alt="share referal" />
              </div>
            </div>
          </div>
        </div>
    </>
    
  )
}
*/

/*
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
  player: IReferral
}

interface FriendsListProps {
  friends: IReferral[]
}   

const FriendsList: FC<FriendsListProps> = (props) => {
  const { friends } = props
  return <div className="mt-4 w-full flex flex-col gap-4 z-0">
      {friends.map((friend, i) => <UserItem key={i} player={friend} />)}
  </div>
}

const UserItem: FC<UserItemProps> = (props) => {
  const { player } = props
  
  return <div className="w-full flex flex-row justify-between h-[52px]">
      <div className="flex flex-row gap-2 items-center">
          <img className="w-[36px] h-[36px] rounded-full" 
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt={player.username} />
          <div className="flex flex-col">
              <div className="sm-user-name">{player.username}</div>
              <div className="sm-user-status">
                  {true ? `Active · ${player.incomePerHour}%` : `Inactive · ${player.balance} Tap`}
              </div>
          </div>
      </div>
      <div className="flex items-center justify-center">
          <div className={`user-bonus ${true ? 'bg-[#696969]' : 'bg-[#886867]'} `}>+{player.incomePerHour}</div>
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

*/