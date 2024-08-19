//import SVGHeader from "@/components/svg.header";
//import SVGHeader from "@/components/svg.header";
//import useBackgroundMover from "@/hooks/background-mover";
import { useSiteStore } from "@/providers/store";
import { Page } from "@/types";
import { FC, useEffect } from "react";

const Offer: FC = () => {

  const { setPage } = useSiteStore()

  useEffect(() => {
      setPage(Page.OFFER)
  }, [setPage])

  //const position = useBackgroundMover(7); // Adjust multiplier as needed

//   const backgroundStyle = {
//     backgroundPosition: `${position.x}% ${position.y}%`,
//   };
  

    return (
    <div className=''>
      
   </div>)
}
export default Offer