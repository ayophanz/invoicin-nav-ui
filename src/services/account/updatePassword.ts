import axios from '../../plugins/axios';
import passwordTransformer from '../../transformers/passwordTransformer';

const success = (data: object, resolve: any) => {
    resolve(data);
};

const fail = (data: object, reject: any) => {
    const transfomer = passwordTransformer.fetch(data);
    reject(transfomer);
};

export default (id: number, data: object) => {
    const transfomer = passwordTransformer.send(data);
    return new Promise((resolve, reject) => {
        axios.put(`api/account/password/update/${id}`, transfomer)
        .then((response) => {
            success(response.data, resolve);
        }).catch((error) => {
            fail(error.response.data.errors, reject);
        });
    } );
}