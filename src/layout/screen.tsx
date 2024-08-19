//import { useSiteStore } from "@/providers/store";
//import { Page } from "@/types";
import { FC, PropsWithChildren } from "react";

const Screen: FC <PropsWithChildren> = ({ children }) => {
    // const { page } = useSiteStore();

    // const getBGForPage = (page: Page) => {
    //   switch (page) {
    //       case Page.HOME:
    //           return 'gradient-background-anim-green';
    //       case Page.PROGRAM:
    //           return 'bg-gradient-for-blue-2';
    //       case Page.LOCATION:
    //           return 'bg-background-for-pink';
    //       case Page.CHECKIN:
    //           return 'bg-gradient-for-orange';
    //       default:
    //           return '';
    //   }
  //};

    return  <div className={`w-screen h-screen`}>    
        {children}
  </div>
}
export default Screen