import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import Auth from '@/services/api/auth';
import { useUserStore } from '@/providers/user';
import { IPlayer } from '@/types';
//import { useAxiosPostTrigger } from '@/services/axios.service'

export const useRegister = (apiFetch: any, loadResources: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setPlayer } = useUserStore();

  const register = useCallback(
    async (initData: string) => {
   
      try {
        const res = await apiFetch('/auth/register', 'POST', { initData }, enqueueSnackbar);

        /* Set tokens */
        if (res.accessToken) {
          Auth.accessToken = res.accessToken;
        }

        if (res.refreshToken) {
          Auth.refreshToken = res.refreshToken;
        }
        
        if (res.player) {

          const player = res.player as IPlayer;
          setPlayer(player);

          console.log(player);

          loadResources(); 
        }
      } catch (error: any) {
        //console.error('Error during login:', error);
        //let message = error?.message || 'Unknown';
        //enqueueSnackbar(`Error during login: ${error.message}`, { variant: 'info' });
        enqueueSnackbar(`Error during login: ${error}`, { variant: 'error' });
      } finally {
      }
    },
    [apiFetch, enqueueSnackbar, loadResources] // Dependencies
  )

  return { register }
}
