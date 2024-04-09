import axios from '../../plugins/axios';
import { useAccountStore } from '../../stores/account';
import router from '../../router';

const success = (response: string, resolve:any) => {
    const accountStore = useAccountStore();
    accountStore.refreshToken(response);
    router.push({ name: 'main' });
    return resolve();
};

const fail = (error: object, reject: any) => {
    return reject(error);
};

export default () => {
    return new Promise((resolve, reject) => {
        axios.get('api/refresh')
        .then((response) => {
            success(response.data.token, resolve);
        })
        .catch((error) => {
            fail(error.response.data, reject);
        })
    });
}