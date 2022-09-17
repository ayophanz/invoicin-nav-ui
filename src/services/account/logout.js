import axios from '../../plugins/axios';
import { useAccountStore } from '../../stores/account';

const success = (resolve) => {
    const accountStore = useAccountStore();
    accountStore.logout();

    window.location.replace('/login');

    return resolve();
};

const failed = (error, reject) => {
    return reject(error.response.data);
};

export default () => {
    return new Promise((resolve, reject) => {
        axios.post('api/logout')
        .then(() => {
            success(resolve);
        })
        .catch((error) => {
            failed(error, reject);
        })
    });
}