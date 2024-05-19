import axios from "../../plugins/axios";
import { useAccountStore } from "../../stores/account";
import MeTransformer from "../../transformers/meTransformer";

const success = (response: object, resolve: any) => {
  if (response) {
    const transformer = MeTransformer.fetch(response);
    const accountStore = useAccountStore();
    accountStore.me(transformer);
    return resolve(response);
  }
};

const fail = (error: object, reject: any) => {
  return reject(error);
};

export default () => {
  return new Promise((resolve, reject) => {
    axios
      .get("api/account/show")
      .then((response: { data: { data: Object } }) => {
        success(response.data.data, resolve);
      })
      .catch((error: Object) => {
        fail(error, reject);
      });
  });
};
