import axios from 'axios';
import accountService from '../services/account';
import router from '../router';
import { useAccountStore } from './../stores/account';

const logoutErrors = [
    40102, // No token provided
    40103, // Invalid token
];

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const accountStore = useAccountStore();
        
        /**
         * Unauthorized
         */
        if (error.response.status === 401) {
            const errorCode = error.response.data.error.code;
            /**
             * Logout error
             */
            if (logoutErrors.indexOf(errorCode) >= 0) {
                accountService.logout();
                return Promise.reject(error);
            }

            /**
             * Token expired
             */
            if (errorCode === 40104) {
                if (router.currentRoute.value.meta.auth == true || Object.keys(router.currentRoute.value.meta).length == 0) {
                    accountStore.sessionExpired();
                    router.push({ name: 'sessionExpired' });
                }
                return Promise.reject(error);
            }

            /**
             * Login required
             */
            if (errorCode === 40105) {
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

axios.interceptors.request.use(
    (config) => {
        if (localStorage.getItem('id_token')) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('id_token')}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axios;