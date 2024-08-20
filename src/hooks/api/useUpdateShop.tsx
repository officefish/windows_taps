import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications

const useUpdateShop = (apiFetch: any, showLoading: any, hideLoading: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const updateShop = useCallback(
    async () => {
      try {
        showLoading(); // Show loading state
        const res = await apiFetch(
          '/market/getMarket',
          'GET',
          null,
          enqueueSnackbar
        );
        console.log(res);
        if (res.status === true) {
          // Handle successful response
        }
      } catch (error) {
        console.error('Error updating user shop:', error);
        enqueueSnackbar('Error updating shop', { variant: 'error' });
      } finally {
        hideLoading(); // Hide loading state
      }
      return null;
    },
    [apiFetch, enqueueSnackbar, showLoading, hideLoading] // Dependencies
  );

  return { updateShop };
};

export default useUpdateShop;