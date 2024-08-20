import { FC, useEffect } from "react"
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
import useUpdateFriends from "@/hooks/api/useUpdateFriends"
import useUpdateUser from "@/hooks/api/useUpdateUser"
import useLogin from "@/hooks/api/useLogin"
//import { OptionsObject } from "notistack"

import apiFetch from "@/services/api"
import useUpdateTasks from "@/hooks/api/useUpdateTasks"
import useUpdateShop from "@/hooks/api/useUpdateShop"

const showLoading = () => {
  // Реализация функции showLoading
  console.log('Show loading');
}

const hideLoading = () => {
  // Реализация функции hideLoading
  console.log('Hide loading');
}

const Cabinet:FC = () => {

  const { updateUser } = useUpdateUser(apiFetch, showLoading, hideLoading);
  const { updateFriends } = useUpdateFriends(apiFetch, showLoading, hideLoading);
  const { updateTasks } = useUpdateTasks(apiFetch, showLoading, hideLoading);
  const { updateShop } = useUpdateShop(apiFetch, showLoading, hideLoading);

  const loadResources = async () => {
    const apiRequests = [
        //updateUser(initData)
        updateTasks(),
        updateFriends(),
        updateShop()
    ];

    // const imageRequests = [
    //     loadImage("/referrals.png"),
    // ];

    await Promise.all([...apiRequests, /*...imageRequests*/])

    //setLoading(false);
  }

  const { login } = useLogin(apiFetch, loadResources, showLoading, hideLoading);

  useEffect(() => {
    const initData = window?.Telegram 
      ? window?.Telegram?.WebApp?.initData 
      : ""
      console.log("initData: " + initData)    

    login(initData)
  
}, [updateFriends, updateShop, updateTasks, updateUser])


    return (
    <Screen>
      <Header />
      <Content>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/friends' element={<Friends/>} />
            <Route path='/tasks' element={<Tasks/>} />
            <Route path='/shop' element={<Shop/>} />
            <Route path='/offer' element={<Offer/>} />
        </Routes>
      </Content>
      <Footer>
       <Navigation />
      </Footer> 
    </Screen>)
}

export default Cabinet