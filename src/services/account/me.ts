import axios from "../../plugins/axios";
import { useAccountStore } from "../../stores/account";
import MeTransformer from "../../transformers/meTransformer";
import { MeTransformerFetch } from "../../types/meTransformerFetch";

const success = (
  response: MeTransformerFetch,
  resolve: (resolve: object) => void
) => {
  if (response) {
    const transformer = MeTransformer.fetch(response);
    const accountStore = useAccountStore();
    accountStore.setMe(transformer);
    resolve(response);
  }
};

const fail = (error: MeTransformerFetch, reject: (reject: object) => void) => {
  reject(error);
};

export default () => {
  return new Promise((resolve, reject) => {
    axios
      .get("api/account/show")
      .then((response) => {
        success(response.data.data, resolve);
      })
      .catch((error) => {
        fail(error, reject);
      });
  });
};
