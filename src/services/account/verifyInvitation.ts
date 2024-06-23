import axios from "../../plugins/axios";

const success = (response: object, resolve: (resolve: object) => void) => {
  resolve(response);
};

const fail = (error: object, reject: (reject: object) => void) => {
  reject(error);
};

export default (token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`api/account/verify-invitation/${token}`)
      .then((response) => {
        success(response, resolve);
      })
      .catch((error) => {
        fail(error, reject);
      });
  });
};
