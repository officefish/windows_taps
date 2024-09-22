import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';

export const useLoseMinigame = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setMinigame } = useUserStore();

  const loseMinigame = useCallback(
    async () => {
   
      try {
        const res = await apiFetch('/quest/minigame', 'POST', {win:false}, enqueueSnackbar);
        
        console.log(res)

        if (res) {
            setMinigame(res);
        }

      } catch (error: any) {
        enqueueSnackbar(`Error during play minigame: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar] // Dependencies
  )

  return { loseMinigame }
}
