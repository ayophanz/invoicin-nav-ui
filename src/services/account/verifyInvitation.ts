import axios from "../../plugins/axios";

const success = (data: object, resolve: any) => {
  return resolve(data);
};

const failed = (error: object, reject: any) => {
  return reject(error);
};

export default (token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`api/account/verify-invitation/${token}`)
      .then((response: object) => {
        success(response, resolve);
      })
      .catch((error: object) => {
        failed(error, reject);
      });
  });
};
