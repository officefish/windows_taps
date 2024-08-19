import { FC, PropsWithChildren } from "react";

const Content: FC <PropsWithChildren> = ({ children }) => {
    return  <main className=''>
    <div className=''>
        {children}
    </div>
  </main>
}
export default Content