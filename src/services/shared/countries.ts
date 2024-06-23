import axios from "../../plugins/axios";

const success = (response: any, resolve: (response: object) => void) => {
  resolve(response);
};

const fail = (error: object, reject: (error: object) => void) => {
  reject(error);
};

export default () => {
  return new Promise((resolve, reject) => {
    axios
      .get("api/account/countries")
      .then((response) => {
        success(response.data, resolve);
      })
      .catch((error) => {
        console.log(error);
        fail(error, reject);
      });
  });
};
