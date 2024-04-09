import axios from '../../plugins/axios';

const success = (data: object, resolve: any) => {
    return resolve(data);
};

const failed = (data: object, reject: any) => {
    return reject(data);
};

export default (data: object) => {
    return new Promise((resolve, reject) => {
        axios.post('api/login', data)
        .then((response) => {
            success(response.data, resolve);
        })
        .catch((error) => {
            failed(error.response.data.error, reject);
        })
    });
}