import UserBalance from "@/components/user.balance";
import UserEnergy from "@/components/user.energy";
import UserMin from "@/components/user.min";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect } from "react";

const Home: FC = () => {

  const { setPage } = useSiteStore()

  useEffect(() => {
      setPage(Page.HOME)
  }, [setPage])

  const user = {
    name: 'John Doe',
    photoUrl: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
  }
  

    return (
    <div className='w-full p-4 text-left'>
      <div className="w-full grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <UserMin fullname={user.name} 
          photoUrl={user.photoUrl} />
        </div>
        <div className="text-right flex items-center justify-end">key??</div>
        <UserEnergy level="Bronse" progress={35} />
        <div className="col-span-2 flex justify-end">
          <UserBalance balance={100} />
        </div>
      </div>
   </div>)
}
export default Home