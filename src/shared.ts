const apiCache = new Map();
export function getData(url: string) {
  // const data = apiCache.get(url);
  // if (data) {
  //   console.log("cached api");
  //   return Promise.resolve(data);
  // }
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     const apiResponse = {
  //       result: 10,
  //     };
  //     apiCache.set(url, apiResponse);
  //     console.log("actual api");
  //     resolve(apiResponse);
  //   }, 2000);
  // });

  return "test";
}
