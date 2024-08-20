import { useCallback } from 'react';
import { useSnackbar } from 'notistack'; // Assuming you're using notistack for notifications

const useUpdateTasks = (apiFetch: any, showLoading: any, hideLoading: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const updateTasks = useCallback(
    async () => {
      try {
        showLoading(); // Show loading state
        const res = await apiFetch('/mission/getMissions', 'GET', null, enqueueSnackbar);
        console.log(res);
        if (res.status === true) {
          console.log('Tasks from server received');
          //const missions = res.data.missions;
          //setAllTasks(missions);
        }
      } catch (error) {
        console.error('Error updating user tasks:', error);
        enqueueSnackbar('Error updating tasks', { variant: 'error' });
      } finally {
        hideLoading(); // Hide loading state
      }
      return null;
    },
    [apiFetch, enqueueSnackbar, showLoading, hideLoading] // Dependencies
  );

  return { updateTasks };
};

export default useUpdateTasks;