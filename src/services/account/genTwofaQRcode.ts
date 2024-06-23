import axios from "../../plugins/axios";

const success = (response: object, resolve: (resolve: object) => void) => {
  resolve(response);
};

const fail = (error: object, reject: (reject: object) => void) => {
  reject(error);
};

export default (data: object) => {
  return new Promise((resolve, reject) => {
    axios
      .post("api/account/generate-2fa-qr-code", data)
      .then((response) => {
        success(response.data, resolve);
      })
      .catch((error) => {
        fail(error.response.data, reject);
      });
  });
};
