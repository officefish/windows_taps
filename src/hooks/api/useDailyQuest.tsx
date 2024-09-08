import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';
//import { useUserStore } from '@/providers/user';
//import { useUserStore } from '@/providers/user';
//import { IPlayer } from '@/types';
//import { useAxiosPostTrigger } from '@/services/axios.service'

export const useDailyQuest = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { updateDailyQuest, updatePlayerBalance } = useUserStore();

  const dailyQuest = useCallback(
    async () => {
   
      try {
        const res = await apiFetch('/quest/daily-reward', 'POST', {energy:0}, enqueueSnackbar);
        updatePlayerBalance(res.balance)
        updateDailyQuest(true)
        
      } catch (error: any) {
        //console.error('Error during login:', error);
        //let message = error?.message || 'Unknown';
        //enqueueSnackbar(`Error during login: ${error.message}`, { variant: 'info' });
        enqueueSnackbar(`Error during dailyQuestInfo: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { dailyQuest }
}
