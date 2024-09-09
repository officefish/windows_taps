import { OptionsObject } from 'notistack';
import Auth from './auth';
//import Auth from "./auth"
//import { useCallback } from 'react';
let activeRequests = 0;

//const apiURL = import.meta.env.VITE_API_URL || 'http://188.68.221.24/api/v1'
const apiURL = import.meta.env.VITE_API_URL || 'https://d616-5-18-176-212.ngrok-free.app/api/v1'


export default async function apiFetch(
    url: string, 
    method: string, 
    body: Record<string, unknown> | null = null, 
    enqueueSnackbar: (msg: string, options?: OptionsObject) => void,
    showLoading?: () => void,
    hideLoading?: () => void,
	// keepalive: boolean | false = false
) {

    activeRequests++;
    if (activeRequests === 1) {
        showLoading != null && showLoading();
    }
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
			// 'UserId': String(window.Telegram?.WebApp?.initDataUnsafe?.user?.id) || "0",
             ...(Auth.accessToken ? {
                 "Authorization": "Bearer " + Auth.accessToken
             } : {})
            },
		// keepalive: keepalive
    };

  

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${apiURL}${url}`, options);
        const data = await response.json();

		if (data.message === "Guild doesn't exist") {
			return data
		}

        if (response.status === 401) {
            throw new Error(data.message);
        }

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        if (data.status === false) {
            throw new Error(data.message);
        }

        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        } else {
            enqueueSnackbar('An unknown error occurred', { variant: 'error' });
        }
        throw error;
    } finally {
        activeRequests--;
        if (activeRequests === 0) {
            hideLoading != null && hideLoading();
        }
    }
}