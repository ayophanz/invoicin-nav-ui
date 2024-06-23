import axios from "../../plugins/axios";
import RegisterTransformer from "../../transformers/registerTransformer";
import { RegisterTransformerFetch } from "../../types/registerTransformerFetch";
import { RegisterTransformerSend } from "../../types/registerTransformerSend";

const success = (
  response: RegisterTransformerFetch,
  resolve: (resolve: object) => void
) => {
  const transformer = RegisterTransformer.fetch(response);
  resolve(transformer);
};

const fail = (
  error: RegisterTransformerFetch,
  reject: (reject: object) => void
) => {
  const transformer = RegisterTransformer.fetch(error);
  reject(transformer);
};

export default (data: RegisterTransformerSend) => {
  const transformer = RegisterTransformer.send(data);
  return new Promise((resolve, reject) => {
    axios
      .post("api/account/register/store", transformer)
      .then((response) => {
        success(response.data, resolve);
      })
      .catch((error) => {
        fail(error.response.data.errors, reject);
      });
  });
};
