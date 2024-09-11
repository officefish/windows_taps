import { FC, useEffect, useState } from "react"
import Header from "./header"
import Content from "./content"
import Footer from "./footer"
import Navigation from "./nav"
import Screen from "./screen"

import { Route, Routes } from "react-router-dom"

import Home from "@/pages/home"
import Friends from "@/pages/friends"
import Tasks from "@/pages/tasks"
import Shop from "@/pages/shop"
import Offer from "@/pages/offer"

import { WithLoader } from "@/components/loading"
import Puzzle from "@/pages/puzzle"
import { useRegister } from "@/hooks/api/useRegister"
import { apiFetch } from "@/services/api"
import { useDailyQuestInfo } from "@/hooks/api/useDailyQuestInfo"
import { useUpdateShop } from "@/hooks/api/useUpdateShop"
import useUpdateIncome from "@/hooks/api/useUpdateIncome"


const INIT_DATA = "user=%7B%22id%22%3A334222503%2C%22first_name%22%3A%22Sergey%22%2C%22last_name%22%3A%22Inozemcev%22%2C%22username%22%3A%22indiecaps%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=5932003416224221582&chat_type=private&auth_date=1725562692&hash=331fb60ae520990442e7847eae5f6a4295c29d81be892a4295e6f32731e8da66"

const Cabinet:FC = () => {

  const { dailyQuestInfo } = useDailyQuestInfo(apiFetch);
  const { updateShop } = useUpdateShop(apiFetch);
  const { updateIncome } = useUpdateIncome(apiFetch)
  
  const [isLoading, setIsLoading] = useState(true);

  const loadResources = async () => {
    const apiRequests = [
      dailyQuestInfo(),  
      updateShop(),
      updateIncome(),
      //
    ];
    await Promise.all([...apiRequests],)
  }

  const { register } = useRegister(apiFetch, loadResources);
  const [isPreflight, setIsPreflight] = useState(false);
  const initData = window?.Telegram?.WebApp?.initData || INIT_DATA;


  useEffect(() => {
    
    // Trigger a timer that waits 2 seconds before executing the register function
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Adjust the time in milliseconds as needed (1 second = 1000ms)
    // 
    if (!isPreflight) {
      setIsPreflight(true)
      register(initData)
    }
    //
    return () => clearTimeout(timer);
  }, [register, isPreflight, setIsPreflight, setIsLoading]);

return (
  <WithLoader isLoading={isLoading}>
    <Screen>
      <Header />
      <Content>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/friends' element={<Friends/>} />
            <Route path='/tasks' element={<Tasks/>} />
            <Route path='/shop' element={<Shop/>} />
            <Route path='/offer' element={<Offer/>} />
            <Route path='/puzzle' element={<Puzzle/>} />
        </Routes>
      </Content>
      <Footer>
       <Navigation />
      </Footer> 
    </Screen>
  </WithLoader>)
}

export default Cabinet