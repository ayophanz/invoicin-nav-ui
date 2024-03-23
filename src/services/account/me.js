import axios from '../../plugins/axios';
import { useAccountStore } from '../../stores/account';

const success = (response, resolve) => {
    if (response) {
        const accountStore = useAccountStore();
        accountStore.me(response.data.me);
        return resolve(response);
    }
};

const failed = (error, reject) => {
    return reject(error);
};

export default () => {
    return new Promise((resolve, reject) => {
        axios.get('api/account/show')
        .then((response) => {
            success(response, resolve);
        })
        .catch((error) => {
            failed(error, reject);
        })
    });
}