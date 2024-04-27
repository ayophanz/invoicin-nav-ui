import axios from '../../plugins/axios';

const success = (data: object, resolve: any) => {
    return resolve(data);
};

const failed = (error: object, reject: any) => {
    return reject(error);
};

export default () => {
    return new Promise((resolve, reject) => {
        axios.get('api/is-auth')
        .then((response) => {
            success(response, resolve);
        })
        .catch((error) => {
            failed(error, reject);
        })
    });
}