import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect } from "react";

const Home: FC = () => {

  const { setPage } = useSiteStore()

  useEffect(() => {
      setPage(Page.HOME)
  }, [setPage])

  //const position = useBackgroundMover(7); // Adjust multiplier as needed

//   const backgroundStyle = {
//     backgroundPosition: `${position.x}% ${position.y}%`,
//   };
  

    return (
    <div className=''>
      
   </div>)
}
export default Home