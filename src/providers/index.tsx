import { FC, PropsWithChildren } from "react"
import { SiteProvider } from "./store"
import { UserProvider } from "./user"
import { SnackbarProvider } from "notistack"

const Providers: FC <PropsWithChildren> = ({ children }) => {
    return (
        <SnackbarProvider 
        maxSnack={3} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <SiteProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </SiteProvider>
        </SnackbarProvider>
    )
}
export default Providers