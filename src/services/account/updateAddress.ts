import axios from "../../plugins/axios";
import AddressTransformer from "../../transformers/addressTransformer";
import { AddressTransformerFetch } from "../../types/addressTransformerFetch";
import { AddressTransformerSend } from "../../types/addressTransformerSend";

const success = (
  response: AddressTransformerFetch,
  resolve: (resolve: object) => void
) => {
  const transformer = AddressTransformer.fetch(response);
  resolve(transformer);
};

const fail = (
  error: AddressTransformerFetch,
  reject: (reject: object) => void
) => {
  const transformer = AddressTransformer.fetch(error);
  reject(transformer);
};

export default (data: AddressTransformerSend) => {
  const transformer = AddressTransformer.send(data);
  return new Promise((resolve, reject) => {
    axios
      .post("api/account/address/update", transformer)
      .then((response) => {
        success(response.data, resolve);
      })
      .catch((error) => {
        fail(error.response.data.errors, reject);
      });
  });
};
