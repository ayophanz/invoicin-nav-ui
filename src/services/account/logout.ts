import axios from "../../plugins/axios";
import { useAccountStore } from "../../stores/account";

const success = (response: object, resolve: (resolve: object) => void) => {
  const accountStore = useAccountStore();
  accountStore.setLogout();
  resolve(response);
};

const fail = (error: object, reject: (reject: object) => void) => {
  reject(error);
};

export default () => {
  return new Promise((resolve, reject) => {
    axios
      .post("api/logout")
      .then((response) => {
        success(response, resolve);
      })
      .catch((error) => {
        console.log(error);
        fail(error.response.data, reject);
      });
  });
};
