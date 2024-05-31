import axios from "../../plugins/axios";
import passwordTransformer from '../../transformers/passwordTransformer';

const success = (data: object, resolve: any) => {
  return resolve(data);
};

const failed = (data: object, reject: any) => {
  const transfomer = passwordTransformer.fetch(data);
    return reject(transfomer);
};

export default (token: string, data: object) => {
  const transfomer = passwordTransformer.send(data);
  return new Promise((resolve, reject) => {
    axios
      .post(`api/account/verify-invitation/setup-password/${token}`, transfomer)
      .then((response: object) => {
        success(response, resolve);
      })
      .catch((error: { response: { data: { errors: object }}}) => {
        failed(error.response.data.errors, reject);
      });
  });
};
