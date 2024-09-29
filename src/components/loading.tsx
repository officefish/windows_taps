/* HTML: <div class="loader"></div> */
//import { useLoaderStore } from "@/providers/store"
import { FC, PropsWithChildren } from "react"


const Loading:FC = () => {
    
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="loader"></div>
        </div>
        
    )
}

interface ILoadingProps {
    isLoading: boolean
}

export default Loading

// export const WithLoader:FC<PropsWithChildren<ILoadingProps>> = (props) => {
    
//     const { isLoading, children } = props
//     console.log(isLoading, children)

//     return <div className="
//     w-screen h-screen 
//     preloader-bg
//     ">
//         <div className="flex items-end justify-end h-screen">
//             <div className="preloader-overlay"></div>    
//         </div>
//         <div className="absolute top-0 h-full w-full flex-col">
//             <div className="relative top-16 flex justify-center items-center w-full">
//                 <div className="coin-loader"></div>
//             </div>
//             <div className="relative pb-56 flex flex-col justify-end items-center h-screen w-full">
//                 <div className="preloader-title-bg"></div>
//                 <div className="text-sf-pro w-full text-center text-white mt-4">Построй свою оконную империю!</div>
//             </div>
//         </div>
      

//     </div>
    
// }

export const WithLoader:FC<PropsWithChildren<ILoadingProps>> = (props) => {
    
    const { isLoading, children } = props

    return isLoading
        ? <div className="
        w-screen h-screen 
        preloader-bg
        ">
            <div className="flex items-end justify-end h-screen">
                <div className="preloader-overlay"></div>    
            </div>
            <div className="absolute top-0 h-full w-full flex-col">
                <div className="relative top-16 flex justify-center items-center w-full">
                    <div className="coin-loader"></div>
                </div>
                <div className="relative pb-56 flex flex-col justify-end items-center h-screen w-full">
                    <div className="preloader-title-bg"></div>
                    <div className="text-sf-pro w-full text-center text-white mt-4">Построй свою оконную империю!</div>
                </div>
            </div>
        </div>
        : <>{children}</>
}

