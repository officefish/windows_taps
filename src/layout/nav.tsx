import NavButton from "@/components/nav.button";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC } from "react";

const Navigation: FC = () => {

  const { page } = useSiteStore()

    return <div className="w-full grid grid-cols-5 bg-base-100 z-50">
      <NavButton selected={page === Page.HOME} to={'/'} title={'Главная'}/>
      <NavButton selected={page === Page.SHOP} to={'/shop'} title={'Магазин'}/>
      <NavButton selected={page === Page.TASKS} to={'/tasks'} title={'Задания'}/>
      <NavButton selected={page === Page.FRIENDS} to={'/friends'} title={'Друзья'}/>
      <NavButton selected={page === Page.OFFER} to={'/offer'} title={'Оффер'}/>
    </div>
}
export default Navigation