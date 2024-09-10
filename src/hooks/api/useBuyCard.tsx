import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';
//import { useAxiosPostTrigger } from '@/services/axios.service'

export const useBuyCard = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setShop } = useUserStore();

  const buyCard= useCallback(
    async (cardId: string) => {
   
      try {
        const res = await apiFetch('/shop/buy', 'POST', { cardId }, enqueueSnackbar);
        console.log(res)
        setShop(res)
        
      } catch (error: any) {
        enqueueSnackbar(`Error during buy card: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { buyCard }
}
