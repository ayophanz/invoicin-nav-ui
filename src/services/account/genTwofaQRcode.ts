import axios from '../../plugins/axios';

const success = (data: object, resolve: any) => {
    return resolve(data);
};

const failed = (error: object, reject: any) => {
    return reject(error);
};

export default (data: object) => {
    return new Promise((resolve, reject) => {
        axios.post('api/account/generate-2fa-qr-code', data)
        .then((response) => {
            success(response.data, resolve);
        })
        .catch((error) => {
            failed(error.response.data, reject);
        })
    });
}