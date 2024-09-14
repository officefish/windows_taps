import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications

const useUpdateReferrals = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const page = 1
  const take = 5

  const updateReferrals = useCallback(
    async () => {
      try {
        const res = await apiFetch(
          '/player/refferals',
          'POST',
          {page, take},
          enqueueSnackbar
        );
        console.log(res);
        // if (res.status === true) {
        //   // Handle successful response
        // }
      } catch (error) {
        console.error('Error updating user friends:', error);
        enqueueSnackbar('Error updating friends', { variant: 'error' });
      } 
      return null;
    },
    [apiFetch, enqueueSnackbar, page, take] // Dependencies
  );

  return { updateReferrals };
};

export default useUpdateReferrals;