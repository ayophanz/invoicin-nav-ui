import axios from '../../plugins/axios';
import otpTransformer from '../../transformers/otpTransformer';

const success = (response: object, resolve: any) => {
    return resolve(response);
};

const fail = (data: object, reject: any) => {
    const transfomer = otpTransformer.fetch(data);
    return reject(transfomer);
};

export default (id: number, data: object) => {
    const transfomer = otpTransformer.send(data);
    return new Promise((resolve, reject) => {
        axios.post(`api/verify-otp/${id}`, transfomer)
        .then((response) => {
            success(response.data, resolve);
        })
        .catch((error) => {
            fail(error.response.data.errors, reject);
        })
    });
}