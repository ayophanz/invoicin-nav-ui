import axios from "../../plugins/axios";
import { useAccountStore } from "../../stores/account";

const success = (resolve: any) => {
  const accountStore = useAccountStore();
  accountStore.setLogout();
  window.history.replaceState({}, "", `${window.location.origin}/login`);

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
        fail(error.response.data, reject);
      });
  });
};
