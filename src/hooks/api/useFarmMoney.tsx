import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';
//import { useUserStore } from '@/providers/user';
//import { IPlayer } from '@/types';
//import { useAxiosPostTrigger } from '@/services/axios.service'

export const useFarm = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { updatePlayerBalance, updatePlayerEnergy } = useUserStore();

  const farm = useCallback(
    async (data: {
      energy: number,
      money: number,
    }) => {
   
      try {
        const res = await apiFetch('/player/farm', 'POST', {...data}, enqueueSnackbar);
        if (res.balance) {
          updatePlayerBalance(res.balance)
        }

        if (res.energyLatest && res.energyLatest) {
          updatePlayerEnergy(res.energyLatest, res.energyMax)
        }
        
      } catch (error: any) {
        //console.error('Error during login:', error);
        //let message = error?.message || 'Unknown';
        //enqueueSnackbar(`Error during login: ${error.message}`, { variant: 'info' });
        enqueueSnackbar(`Error during farm: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { farm }
}
