import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';
import { useNavigate } from 'react-router-dom';

export const useUpgradeCard = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()
  const { setShop, updatePlayerBalance, updatePlayerIncome } = useUserStore();

  const upgradeCard= useCallback(
    async (cardId: string) => {
   
      try {
        const res = await apiFetch('/shop/upgrade', 'POST', { cardId }, enqueueSnackbar);
        console.log(res)
        setShop(res.categories)
        updatePlayerBalance(res.balance)
        updatePlayerIncome(res.incomePerHour) 
        navigate('/')
        
      } catch (error: any) {
        enqueueSnackbar(`Error during upgrade card: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { upgradeCard }
}
