import {
    Page,
  } from "@/types"
  export interface IStoreState {
    page: Page
  }
  
  export interface IStoreActions {
    setPage: (page: Page) => void
  }