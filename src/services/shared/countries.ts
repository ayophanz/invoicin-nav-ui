import axios from '../../plugins/axios';

const success = (data: any, resolve: any) => {
    resolve(data);
};

const fail = (data: object, reject: any) => {
    reject(data);
};

export default () => {
    return new Promise((resolve, reject) => {
        axios.get('api/account/countries')
        .then((response) => {
            success(response.data, resolve);
        }).catch((error) => {
            console.log(error);
            fail(error, reject);
        });
    } );
}