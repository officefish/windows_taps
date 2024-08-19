import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, StoreApi, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IStoreState, IStoreActions } from './types'
import { Page } from '../../types'

type IStore = IStoreState & IStoreActions

const createSiteStore = () =>
  createStore<IStore>()((set) => ({
    page: Page.HOME,
    setPage: (page: Page) => set(() => ({ page })),
  }))

type Store = ReturnType<typeof createSiteStore>
const SiteContext = createContext<Store | null>(null)

//eslint-disable-next-line react-refresh/only-export-components
export const useSiteStore = () => {
  const api = useContext(SiteContext) as StoreApi<IStore>
  return {
    page: useStore(api, (state: IStore) => state.page),
    setPage: useStore(api, (state: IStore) => state.setPage),
  }
}

export const SiteProvider: FC<PropsWithChildren> = ({ children }) => {
  const userStoreRef = useRef<Store>()
  if (!userStoreRef.current) {
    userStoreRef.current = createSiteStore()
  }
  return (
    <SiteContext.Provider value={userStoreRef.current}>
      {children}
    </SiteContext.Provider>
  )
}