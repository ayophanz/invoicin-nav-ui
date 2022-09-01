import axios from 'axios';
import accountService from '../services/account';
import router from '../router';

const logoutErrors = [
    40102, // No token provided
    40103, // Invalid token
];

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        /**
         * Unauthorized
         */
        if (error.response.status === 401 /*&& error.response.request.responseURL.index('retry=1' === -1)*/) {
            const errorCode = error.response.data.error.code;
            console.log(errorCode);
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
                    console.log('session expired');
                    // return accountService.refreshToken();
                    router.push({
                        name: 'sessionExpired',
                    }); 
                }
                return;
            }

            /**
             * Email not verified
             */
            if (errorCode === 40113 && Vue.router.history.current.matched.some(
                (record) => record.meta.emailVerificationRequired
            )) {
                console.log('Email not verified');
                router.push({
                    name: 'dashboard',
                }); 
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