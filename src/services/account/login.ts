import axios from '../../plugins/axios';

const success = (data: object, resolve: any) => {
    resolve(data);
};

const failed = (data: object, reject: any) => {
    reject(data);
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