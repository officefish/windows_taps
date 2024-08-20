import { FC, PropsWithChildren } from "react"
import { SiteProvider } from "./store"
import { SnackbarProvider } from "notistack"

const Providers: FC <PropsWithChildren> = ({ children }) => {
    return (
        <SnackbarProvider maxSnack={3}>
            <SiteProvider>
                {children}
            </SiteProvider>
        </SnackbarProvider>
    )
}
export default Providers