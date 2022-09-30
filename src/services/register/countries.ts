import axios from '../../plugins/axios';

const success = (data: object, resolve: any) => {
    resolve(data);
};

const fail = (data: object, reject: any) => {
    reject(data);
};

export default (data: object) => {
    return new Promise((resolve, reject) => {
        axios.get('api/organization/countries', data)
        .then((response) => {
            success(response.data, resolve);
        }).catch((error) => {
            fail(error.response.data.errors, reject);
        });
    } );
}