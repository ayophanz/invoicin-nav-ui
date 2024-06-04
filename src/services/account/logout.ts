import axios from "../../plugins/axios";
import { useAccountStore } from "../../stores/account";

const success = (resolve: any) => {
  const accountStore = useAccountStore();
  accountStore.setLogout();
  return resolve();
};

const fail = (error: object, reject: any) => {
  return reject(error);
};

export default () => {
  return new Promise((resolve, reject) => {
    axios
      .post("api/logout")
      .then(() => {
        success(resolve);
      })
      .catch((error) => {
        console.log(error);
        fail(error.response.data, reject);
      });
  });
};
