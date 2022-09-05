import axios from '../../plugins/axios';

const success = (response, resolve) => {
    return resolve(response);
};

const failed = (error, reject) => {
    return reject(error.response.data);
};

export default () => {
    return new Promise((resolve, reject) => {
        axios.get('api/account/generate-2fa-qr-code')
        .then((response) => {
            success(response.data, resolve);
        })
        .catch((error) => {
            failed(error, reject);
        })
    });
}