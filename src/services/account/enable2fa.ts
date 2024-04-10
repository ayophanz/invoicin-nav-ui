import axios from '../../plugins/axios';

const success = (response: object, resolve: any) => {
    return resolve(response);
};

const failed = (error: object, reject: any) => {
    return reject(error);
};

export default (id: number, data: object) => {
    return new Promise((resolve, reject) => {
        axios.post(`api/account/enable-2fa/${id}`, data)
        .then((response) => {
            success(response.data, resolve);
        })
        .catch((error) => {
            failed(error.response.data, reject);
        })
    });
}