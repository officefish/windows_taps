import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user';

const useUpdateReferrals = (apiFetch: any, page: number, take: number) => {
  const { enqueueSnackbar } = useSnackbar();

  const { 
    setReferralsCode, 
    setReferralsPage,
    setReferralsTotal,
    setRefferals,
  } = useUserStore();

  setReferralsPage(page);
 
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
        if (res.referralCode.length > 0) {
          setReferralsCode(res.referralsCode);
        }

        if (res.referrals.length > 0) {
          setRefferals(page, res.referrals);
        }

        if (res.count > 0) {
          setReferralsTotal(res.count);
        }

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