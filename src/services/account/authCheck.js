import axios from '../../plugins/axios';

const success = (response, resolve) => {
    return resolve(response);
};

const failed = (error, reject) => {
    return reject(error);
};

export default () => {
    return new Promise((resolve, reject) => {
        axios.get('api/auth-check')
        .then((response) => {
            success(response, resolve);
        })
        .catch((error) => {
            failed(error, reject);
        })
    });
}