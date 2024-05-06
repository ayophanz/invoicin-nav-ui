import axios from '../../plugins/axios';

const success = (data: object, resolve: any) => {
    return resolve(data);
};

const failed = (error: object, reject: any) => {
    return reject(error);
};

export default (data: object) => {
    return new Promise((resolve, reject) => {
        axios.post('api/forgot-password', data)
        .then((response) => {
            success(response.data, resolve);
        })
        .catch((error) => {
            failed(error.response.data.error, reject);
        })
    });
}