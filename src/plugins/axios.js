import axios from 'axios';
import router from '../router';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.interceptors.response.use(
    (response) => {
        // if (router.currentRoute.value.meta.auth == false)
        //     return router.replace({ name: 'main' });

        return response;
    },
    (error) => {
        /**
         * Unauthorized
         */
        if (error.response.status === 401) {
            const errorCode = error.response.data.error.code;

            /**
             * Token expired
             */
            if (errorCode === 40101) {
                if (router.currentRoute.value.meta.auth == true || Object.keys(router.currentRoute.value.meta).length == 0) {
                    localStorage.setItem("expired_at", new Date().toString());
                    return router.replace({ name: 'sessionExpired' });
                }
            }

            /**
             * Login required
             */
            if (errorCode === 40102) return router.replace({ name: 'login' });
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