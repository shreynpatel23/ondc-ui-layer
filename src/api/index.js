import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
// use this function to make a get request in application
export function callGetApi(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(url);
      return resolve(response.data);
    } catch (err) {
      return reject(err);
    }
  });
}

export function callPostApi(url, params) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(url, params);
      return resolve(response.data);
    } catch (err) {
      return reject(err);
    }
  });
}
