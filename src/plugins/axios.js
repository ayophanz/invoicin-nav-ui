import axios from 'axios';
import router from '../router';
import { useToast } from "vue-toastification";
import accountService from "../services/account";

const toast = useToast();

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.interceptors.response.use(
    (response) => (response),
    async (error) => {
        /**
         * Unauthorized
         */
        if (error.response.status === 401) {
            const errorCode = error.response.data.code;

            /**
             * Token expired
             */
            if (errorCode === 40102) {
                if (router.currentRoute.value.meta.auth == true || Object.keys(router.currentRoute.value.meta).length == 0) {
                    toast.info("Extending session...", {
                        timeout: 2000,
                    });
                    await accountService.refreshToken();
                    toast.success("Session extended!", {
                        timeout: 2000,
                    });
                    return axios.request(error.config);
                }
            }

            /**
             * Login required
             */
            if (errorCode === 40101) {
                localStorage.removeItem("token");
                localStorage.removeItem("@me:shared_me_state");
                window.axios.defaults.headers.common.Authorization = "";
                window.location.replace(`${window.location.origin}/login`);
            }
        }
        
        return Promise.reject(error);
    }
);

axios.interceptors.request.use(
    (config) => {
        if (localStorage.getItem('token')) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        }
        return config;
    }
);

export default axios;