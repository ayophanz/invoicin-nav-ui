import axios from '../../plugins/axios';
import { useAccountStore } from '../../stores/account';
import router from '../../router';

const success = (response, resolve) => {
    const accountStore = useAccountStore();
    accountStore.refreshToken(response.token);
    router.push({ name: 'dashboard' });
    return resolve();
};

const failed = (error, reject) => {
    return reject(error.response.data);
};

export default () => {
    return new Promise((resolve, reject) => {
        axios.get('api/refresh')
        .then((response) => {
            success(response.data, resolve);
        })
        .catch((error) => {
            failed(error, reject);
        })
    });
}