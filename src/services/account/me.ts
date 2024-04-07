import axios from '../../plugins/axios';
import { useAccountStore } from '../../stores/account';

const success = (response: object, resolve: any) => {
    if (response) {
        const accountStore = useAccountStore();
        accountStore.me(response);
        resolve(response);
    }
};

const failed = (error: object, reject: any) => {
    return reject(error);
};

export default () => {
    return new Promise((resolve, reject) => {
        axios.get('api/account/show')
        .then((response) => {
            success(response.data.data, resolve);
        })
        .catch((error) => {
            failed(error, reject);
        })
    });
}