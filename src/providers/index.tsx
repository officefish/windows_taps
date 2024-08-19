import { FC, PropsWithChildren } from "react"
import { SiteProvider } from "./store"

const Providers: FC <PropsWithChildren> = ({ children }) => {
    return <SiteProvider>
        {children}
    </SiteProvider>
}
export default Providers