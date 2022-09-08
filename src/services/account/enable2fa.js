import axios from '../../plugins/axios';

const success = (response, resolve) => {
    return resolve(response);
};

const failed = (error, reject) => {
    return reject(error.response.data);
};

export default (data) => {
    return new Promise((resolve, reject) => {
        axios.post('api/enable-2fa', data)
        .then((response) => {
            success(response.data, resolve);
        })
        .catch((error) => {
            failed(error, reject);
        })
    });
}