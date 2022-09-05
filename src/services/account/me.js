import axios from '../../plugins/axios';
import { useAccountStore } from '../../stores/account';
import router from '../../router';

const success = (response, resolve) => {
    const accountStore = useAccountStore();
    accountStore.me(response.me);
    if (!response.is_two_fa && router.options.history.state.back === '/login') {
        // router.push({ name: 'twofa' });
    }
    return resolve();
};

const failed = (error, reject) => {
    return reject(error);
};

export default () => {
    return new Promise((resolve, reject) => {
        axios.get('api/me')
        .then((response) => {
            success(response.data, resolve);
        })
        .catch((error) => {
            failed(error, reject);
        })
    });
}