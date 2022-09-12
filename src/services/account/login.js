import axios from '../../plugins/axios';

const success = (response, resolve) => {
    return resolve(response);
};

const failed = (error, reject) => {
    if (error.response.status === 401) {
        return reject({ error: { message: 'Invalid credentials', code: 401 } });
    }
    return reject(error.response.data);
};

export default data => {
    return new Promise((resolve, reject) => {
        axios.post('api/login', data)
        .then((response) => {
            success(response.data, resolve);
        })
        .catch((error) => {
            failed(error, reject);
        })
    });
}