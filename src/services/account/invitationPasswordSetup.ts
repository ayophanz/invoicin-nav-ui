import axios from "../../plugins/axios";
import PasswordTransformer from "../../transformers/passwordTransformer";
import { PasswordTransformerFetch } from "../../types/passwordTransformerFetch";
import { PasswordTransformerSend } from "../../types/passwordTransformerSend";

const success = (
  response: PasswordTransformerFetch,
  resolve: (resolve: object) => void
) => {
  const transformer = PasswordTransformer.fetch(response);
  resolve(transformer);
};

const fail = (
  error: PasswordTransformerFetch,
  reject: (reject: object) => void
) => {
  const transformer = PasswordTransformer.fetch(error);
  reject(transformer);
};

export default (token: string, data: PasswordTransformerSend) => {
  const transformer = PasswordTransformer.send(data);
  return new Promise((resolve, reject) => {
    axios
      .post(
        `api/account/verify-invitation/setup-password/${token}`,
        transformer
      )
      .then((response) => {
        success(response.data, resolve);
      })
      .catch((error) => {
        fail(error.response.data.errors, reject);
      });
  });
};
