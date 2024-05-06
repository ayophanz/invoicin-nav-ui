import axios from '../../plugins/axios';
import addresstransformer from '../../transformers/addressTransformer';

const success = (data: object, resolve: any) => {
    return resolve(data);
};

const fail = (data: object, reject: any) => {
    const transformer = addresstransformer.fetch(data);
    return reject(transformer);
};

export default (id: number, data: object) => {
    const transformer = addresstransformer.send(data);
    return new Promise((resolve, reject) => {
        axios.post(`api/account/address/update/${id}`, transformer)
        .then((response) => {
            success(response.data, resolve);
        }).catch((error) => {
            fail(error.response.data.errors, reject);
        });
    } );
}