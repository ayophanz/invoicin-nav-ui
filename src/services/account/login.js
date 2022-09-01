import axios from '../../plugins/axios';
import { useAccountStore } from '../../stores/account';

const success = (response, resolve) => {
    const accountStore = useAccountStore();
    accountStore.login(response.token);
    return resolve();
};

const failed = (error, reject) => {
    if (error.response.status === 401) {
        return reject({ error: { message: 'Invalid credentials', code: 401 } });
    }
    return reject(error.response.data);
};

export default data => {
    return new Promise((resolve, reject) => {
        axios.post('api/login', data)
        .then((response) => {
            success(response.data, resolve);
        })
        .catch((error) => {
            failed(error, reject);
        })
    });
}