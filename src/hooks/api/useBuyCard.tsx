import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';
import { useNavigate } from 'react-router-dom';

export const useBuyCard = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()
  const { setShop } = useUserStore();

  const buyCard= useCallback(
    async (cardId: string) => {
   
      try {
        const shop = await apiFetch('/shop/buy', 'POST', { cardId }, enqueueSnackbar);
        console.log(shop)
        setShop({...shop})
        navigate('/shop')
        
      } catch (error: any) {
        enqueueSnackbar(`Error during buy card: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { buyCard }
}
