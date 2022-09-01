import axios from '../../plugins/axios';
import { useAccountStore } from '../../stores/account';

const success = (response, resolve) => {
    const accountStore = useAccountStore();
    accountStore.refreshToken(response.token);
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