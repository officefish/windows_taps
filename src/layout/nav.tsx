import NavButton from "@/components/nav.button";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC } from "react";

const Navigation: FC = () => {

  const { page } = useSiteStore()

    return <div className="
    nav-container 
    grid grid-cols-5
    m-4  
    z-50">
      <NavButton selected={page === Page.HOME} to={'/'} title={'Охота'} index={0}/>
      <NavButton selected={page === Page.SHOP} to={'/shop'} title={'Инвентарь'} index={1}/>
      <NavButton selected={page === Page.TASKS} to={'/tasks'} title={'Заманухи'} index={2} />
      <NavButton selected={page === Page.FRIENDS} to={'/friends'} title={'Фирма'} index={3} />
      <NavButton selected={page === Page.OFFER} to={'/offer'} title={'Кладовка'} index={4}/>
    </div>
}
export default Navigation