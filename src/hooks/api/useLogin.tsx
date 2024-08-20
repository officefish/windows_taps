import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications

const useLogin = (apiFetch: any, loadResources: any, showLoading: any, hideLoading: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const login = useCallback(
    async (initData: any) => {
      if (!initData || !initData.length) {
        console.log('initData is empty and replaced with fake');
        initData =
          'query_id=AAGfvR1xAgAAAJ-9HXEoKIIk&user=%7B%22id%22%3A6192741791%2C%22first_name%22%3A%22lintd%22%2C%22last_name%22%3A%22%22username%22%3A%22lintdxcode%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1722334087&hash=852b169c185da58cf6338c86173189fb3f3b65f9057ed89b6c152258ae62d8da';
      }

      try {
        showLoading(); // Show loading state
        const res = await apiFetch('/auth/login', 'POST', { initData }, enqueueSnackbar);
        if (res.status === true) {
          const user = res.data;
          const unsafeData = window?.Telegram?.WebApp?.initDataUnsafe || null;
          if (unsafeData && unsafeData.user) {
            user.fullname = `${unsafeData.user.first_name} ${unsafeData.user.last_name}`;
          }
          //setUser(user);

          // Assuming Auth is a global object or imported from somewhere
          //Auth.token = user.token;

          loadResources(); // Load other resources after successful login
        }
      } catch (error) {
        console.error('Error during login:', error);
        enqueueSnackbar('Error during login', { variant: 'error' });
      } finally {
        hideLoading(); // Hide loading state
      }
    },
    [apiFetch, enqueueSnackbar, loadResources, showLoading, hideLoading] // Dependencies
  )

  return { login }
}

export default useLogin;