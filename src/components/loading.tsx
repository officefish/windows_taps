/* HTML: <div class="loader"></div> */
import { useLoaderStore } from "@/providers/store"
import { FC, PropsWithChildren, useEffect, useState } from "react"


const Loading:FC = () => {
    
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="loader"></div>
        </div>
        
    )
}

export default Loading

export const WithLoader:FC<PropsWithChildren> = ({ children }) => {
    
    const { isLoading } = useLoaderStore()

    const [needLoader, setNeedLoader] = useState(false)

    useEffect(() => {
        setNeedLoader(Boolean(isLoading))
        console.log('isLoading: ', isLoading)
        //document.body.style.overflow = isLoading ? "hidden" : "auto"
    }, [isLoading])

    return needLoader 
    ?   <div className="w-screen h-screen flex items-center justify-center">
            <div className="loader"></div>
        </div>
    :   <>{children}</>
}

