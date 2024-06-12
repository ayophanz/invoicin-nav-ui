import axios from "../../plugins/axios";

const success = (response: string, resolve: any) => {
  localStorage.setItem("token", response);
  (
    window as any
  ).axios.defaults.headers.common.Authorization = `Bearer ${response}`;
  return resolve();
};

const fail = (error: object, reject: any) => {
  return reject(error);
};

export default () => {
  return new Promise((resolve, reject) => {
    axios
      .get("api/refresh")
      .then((response: { data: { token: string } }) => {
        success(response.data.token, resolve);
      })
      .catch((error: { response: { data: object } }) => {
        fail(error.response.data, reject);
      });
  });
};
