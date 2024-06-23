import axios from "../../plugins/axios";
import OtpTransformer from "../../transformers/otpTransformer";
import { OtpTransformerFetch } from "../../types/otpTransformerFetch";
import { OtpTransformerSend } from "../../types/otpTransformerSend";

const success = (
  response: OtpTransformerFetch,
  resolve: (resolve: object) => void
) => {
  const transformer = OtpTransformer.fetch(response);
  resolve(transformer);
};

const fail = (error: OtpTransformerFetch, reject: (reject: object) => void) => {
  const transformer = OtpTransformer.fetch(error);
  reject(transformer);
};

export default (data: OtpTransformerSend) => {
  const transformer = OtpTransformer.send(data);
  return new Promise((resolve, reject) => {
    axios
      .post("api/account/enable-2fa", transformer)
      .then((response) => {
        success(response.data, resolve);
      })
      .catch((error) => {
        fail(error.response.data.errors, reject);
      });
  });
};
