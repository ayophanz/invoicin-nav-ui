import axios from '../../plugins/axios';

const success = (data: object, resolve: any) => {
    resolve(data);
};

const fail = (data: object, reject: any) => {
    reject(data);
};

export default (data: object, type: string) => {
    return new Promise((resolve, reject) => {
        axios.post(`api/account/register/validate/${type}`, data)
        .then((response) => {
            success(response.data, resolve);
        }).catch((error) => {
            fail(error.error, reject);
        });
    } );
}