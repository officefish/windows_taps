import { FC, PropsWithChildren } from "react";

const Content: FC <PropsWithChildren> = ({ children }) => {
    return  <main className=''>
        {children}
  </main>
}
export default Content