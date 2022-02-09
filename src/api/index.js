import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
// use this function to make a get request in application
export function callGetApi(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token") || "";
      const response = await axios.get(url, {
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      });
      return resolve(response.data);
    } catch (err) {
      return reject(err);
    }
  });
}

export function callPostApi(url, params, header) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token") || "";
      const response = await axios.post(url, params, {
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      });
      return resolve(response.data);
    } catch (err) {
      return reject(err);
    }
  });
}
