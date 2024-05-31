import axios from '../../plugins/axios';

const success = (data: object, resolve: any) => {
    return resolve(data);
};

const failed = (error: object, reject: any) => {
    return reject(error);
};

export default () => {
    return new Promise((resolve, reject) => {
        axios.post('api/account/generate-secret')
        .then((response) => {
            success(response.data, resolve);
        })
        .catch((error) => {
            failed(error.response.data, reject);
        })
    });
}