import axios from '../../plugins/axios';

const success = (data: object, resolve: any) => {
    resolve(data);
};

const fail = (data: object, reject: any) => {
    reject(data);
};

export default (data: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`api/account/register/${data.form_type}/validate`, data)
        .then((response) => {
            success(response.data, resolve);
        }).catch((error) => {
            fail(error.response.data.errors, reject);
        });
    } );
}