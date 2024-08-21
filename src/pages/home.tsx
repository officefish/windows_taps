import UserBalance from "@/components/user.balance";
import UserEnergy from "@/components/user.energy";
import UserMin from "@/components/user.min";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, SyntheticEvent, useEffect, useState } from "react";

const Home: FC = () => {

  const { setPage } = useSiteStore()

  useEffect(() => {
      setPage(Page.HOME)
  }, [setPage])

  const user = {
    name: 'Сергей Иноземцев',
    photoUrl: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
  }

  const [balance, setBalance] = useState(100)
  const [energy, setEnergy] = useState(100)
  
  const handleClick = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault()
    setBalance(balance + 1)
    let newEnergy = energy - 1
    if (newEnergy < 0) newEnergy = 0
    setEnergy(newEnergy)
  }

    return (
    <div className='w-full p-4 text-left'>
      <div className="w-full grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <UserMin fullname={user.name} 
          photoUrl={user.photoUrl} />
        </div>
        <div className="text-right flex items-center justify-end">ключи??</div>
        <UserEnergy level="Bronse" progress={35} />
        <div className="col-span-2 flex justify-end">
          <UserBalance balance={balance} />
        </div>
      </div>
      <div>
      <div className="mt-4 w-full">
        <div className="flex items-center justify-center w-full">
          <div className="rounded-3xl border-2 border-primary h-96 w-96 flex items-center justify-center">
            <div className="w-64 h-64 cursor-pointer btn rounded-full" onClick={handleClick}>
              <img className="w-full h-full rounded-full" src="clicker-3.jpg" />
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <img className="w-12 h-12 bg-accent" src="./energy-svg.svg" />
            <div className="h-full flex flex-col items-center justify-center gap-2">
              <div className="w-full text-accent text-center">{energy} / 1000</div>
              <progress className="progress progress-accent w-56 ml-4" value="40" max="100"></progress>
            </div>
          </div>
          <div className=""><div className="btn btn-primary">Буст??</div></div>
        </div>
      </div>
    </div>
   </div>)
}
export default Home