import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useAxiosPostTrigger } from '@/services/axios.service';
//import { useAxiosPostTrigger } from '@/services/axios.service'

export const useRegister = (apiFetch: any, loadResources: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const register = useCallback(
    async (initData: string) => {
   
      try {
        const res = await apiFetch('/auth/register', 'POST', { initData }, enqueueSnackbar);
        console.log(`res: ${res}`);

        console.log(`res.status: ${res.status}`);
        if (res.status === true) {
          const user = res.data;
         
          console.log(`res.data: ${res.data}`);
          const unsafeData = window?.Telegram?.WebApp?.initDataUnsafe || null;
          if (unsafeData && unsafeData.user) {
            user.fullname = `${unsafeData.user.first_name} ${unsafeData.user.last_name}`;
          }
          //setUser(user);

          // Assuming Auth is a global object or imported from somewhere
          //Auth.token = user.token;

          loadResources(); // Load other resources after successful login
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

export const usePreflight = () => {
  const { data, serverError, trigger } = useAxiosPostTrigger<any>({
    route: 'auth/register',
  })

  return { data, serverError, preflight:trigger }
}
