import axios from '../../plugins/axios';
import registerTransformer from '../../transformers/registerTransformer';

const success = (data: object, resolve: any) => {
    resolve(data);
};

const fail = (data: object, reject: any) => {
    const transfomer = registerTransformer.fetch(data);
    reject(transfomer);
};

export default (data: any) => {
    const transfomer = registerTransformer.send(data);
    return new Promise((resolve, reject) => {
        axios.post(`api/account/register/${data.form_type}/validate`, transfomer)
        .then((response) => {
            success(response.data, resolve);
        }).catch((error) => {
            fail(error.response.data.errors, reject);
        });
    } );
}