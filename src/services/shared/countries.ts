import axios from '../../plugins/axios';
import countryTransformer from '../../transformers/countryTransformer';

const success = (data: any, resolve: any) => {
    const transfomer = countryTransformer.fetchCollection(data.data);
    resolve(transfomer);
};

const fail = (data: object, reject: any) => {
    reject(data);
};

export default () => {
    return new Promise((resolve, reject) => {
        axios.get('api/organization/countries')
        .then((response) => {
            success(response.data, resolve);
        }).catch((error) => {
            console.log(error);
            fail(error.response.data.errors, reject);
        });
    } );
}