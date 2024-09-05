//import { useCallback } from 'react'
//import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useAxiosPostTrigger } from '@/services/axios.service'

// const useRegister = (apiFetch: any, loadResources: any, showLoading: any, hideLoading: any) => {
//   const { enqueueSnackbar } = useSnackbar();

//   const register = useCallback(
//     async (initData: string) => {
   
//       try {
//         showLoading(); // Show loading state
//         const res = await apiFetch('/auth/register', 'POST', { initData }, enqueueSnackbar);
//         if (res.status === true) {
//           const user = res.data;
//           const unsafeData = window?.Telegram?.WebApp?.initDataUnsafe || null;
//           if (unsafeData && unsafeData.user) {
//             user.fullname = `${unsafeData.user.first_name} ${unsafeData.user.last_name}`;
//           }
//           //setUser(user);

//           // Assuming Auth is a global object or imported from somewhere
//           //Auth.token = user.token;

//           loadResources(); // Load other resources after successful login
//         }
//       } catch (error) {
//         console.error('Error during login:', error);
//         enqueueSnackbar('Error during login', { variant: 'error' });
//       } finally {
//         hideLoading(); // Hide loading state
//       }
//     },
//     [apiFetch, enqueueSnackbar, loadResources, showLoading, hideLoading] // Dependencies
//   )

//   return { register }
// }

export const useRegister = () => {
  const { data, serverError, trigger } = useAxiosPostTrigger<any>({
    route: 'auth/register',
  })

  return { data, serverError, register:trigger }
}
