import axios from '../../plugins/axios';

const success = (response: object, resolve: any) => {
    return resolve(response);
};

const fail = (error: object, reject: any) => {
    return reject(error);
};

export default (data: object) => {
    return new Promise((resolve, reject) => {
        axios.post('api/verify-otp', data)
        .then((response) => {
            success(response.data, resolve);
        })
        .catch((error) => {
            fail(error.response.data, reject);
        })
    });
}