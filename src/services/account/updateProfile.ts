import axios from '../../plugins/axios';

const success = (data: object, resolve: any) => {
    return resolve(data);
};

const fail = (data: object, reject: any) => {
    return reject(data);
};

export default (id: number, data: object) => {
    return new Promise((resolve, reject) => {
        axios.put(`api/account/profile/update/${id}`, data)
        .then((response) => {
            success(response.data, resolve);
        }).catch((error) => {
            fail(error.response.data.errors, reject);
        });
    } );
}