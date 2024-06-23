import axios from "../../plugins/axios";
import ProfileTransformer from "../../transformers/profileTransformer";
import { ProfileTransformerFetch } from "../../types/profileTransformerFetch";
import { ProfileTransformerSend } from "../../types/profileTransformerSend";

const success = (
  response: ProfileTransformerFetch,
  resolve: (resolve: object) => void
) => {
  const transformer = ProfileTransformer.fetch(response);
  resolve(transformer);
};

const fail = (
  error: ProfileTransformerFetch,
  reject: (reject: object) => void
) => {
  const transformer = ProfileTransformer.fetch(error);
  reject(transformer);
};

export default (data: ProfileTransformerSend) => {
  const transformer = ProfileTransformer.send(data);
  return new Promise((resolve, reject) => {
    axios
      .put("api/account/profile/update", transformer)
      .then((response) => {
        success(response.data, resolve);
      })
      .catch((error) => {
        fail(error.response.data.errors, reject);
      });
  });
};
