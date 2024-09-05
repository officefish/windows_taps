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
//import useUpdateFriends from "@/hooks/api/useUpdateFriends"
//import useUpdateUser from "@/hooks/api/useUpdateUser"
//import useLogin from "@/hooks/api/useLogin"
//import { OptionsObject } from "notistack"

//import apiFetch from "@/services/api"
//import useUpdateTasks from "@/hooks/api/useUpdateTasks"
//import useUpdateShop from "@/hooks/api/useUpdateShop"
import { useLoaderStore } from "@/providers/store"
import { WithLoader } from "@/components/loading"
import Puzzle from "@/pages/puzzle"
import { useRegister } from "@/hooks/api/useRegister"
import apiFetch from "@/services/api"
//import useLogin from "@/hooks/api/useLogin"

// const showLoading = () => {
//   // Реализация функции showLoading
//   console.log('Show loading');
// }

// const hideLoading = () => {
//   // Реализация функции hideLoading
//   console.log('Hide loading');
// }

const INIT_DATA = "user=%7B%22id%22%3A334222503%2C%22first_name%22%3A%22Sergey%22%2C%22last_name%22%3A%22Inozemcev%22%2C%22username%22%3A%22indiecaps%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=5932003416224221582&chat_type=private&auth_date=1725562692&hash=331fb60ae520990442e7847eae5f6a4295c29d81be892a4295e6f32731e8da66"

const Cabinet:FC = () => {

  const { addLoading, hideLoading } = useLoaderStore();
  //const { updateUser } = useUpdateUser(apiFetch, addLoading, removeLoading);
  //const { updateFriends } = useUpdateFriends(apiFetch, addLoading, removeLoading);
  //const { updateTasks } = useUpdateTasks(apiFetch, addLoading, removeLoading);
  //const { updateShop } = useUpdateShop(apiFetch, addLoading, removeLoading);

  const loadResources = async () => {
    const apiRequests: never[] = [
        //updateUser(initData)
        //updateTasks(),
        //updateFriends(),
        //updateShop()
    ];

    // const imageRequests = [
    //     loadImage("/referrals.png"),
    // ];

    await Promise.all([...apiRequests], /*...imageRequests*/)

    //setLoading(false);
  }

  const { register } = useRegister(apiFetch, loadResources, addLoading, hideLoading);

  const [isPreflight, setIsPreflight] = useState(false);
  useEffect(() => {
    const initData = window?.Telegram?.WebApp?.initData || INIT_DATA;

    console.log('useEffect initData: ' + initData);

    // Trigger a timer that waits 1 second before executing the register function
    if (!isPreflight) {
      setIsPreflight(true);
      addLoading()

      // Set a timeout of 1 second (1000 milliseconds)
      const timer = setTimeout(() => {
        register(initData);
        hideLoading();
      }, 2000); // Adjust the time in milliseconds as needed (1 second = 1000ms)

      // Cleanup the timer in case the component unmounts
      return () => clearTimeout(timer);
    }
  }, [register, isPreflight, setIsPreflight]);

return (
  <WithLoader>
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