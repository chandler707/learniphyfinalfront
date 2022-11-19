import axios from "axios";
const baseDomain = "https://learnipybackend.herokuapp.com/api";
// const baseDomain = "http://localhost:8000/api";
// const pdfUrl = "http://localhost:8000/public/";
const pdfUrl = "https://learnipybackend.herokuapp.com/public/";
// const imageDomain = "http://localhost:4300";
// const baseDomain = "http://d280-122-160-30-226.ngrok.io/api";
const imageDomain = "https://learnipybackend.herokuapp.com";
const authorization_prefix = "Bearer ";

export const app_id = "618e5e2f339a8e2b1055fffb";
export const customHeaders = {
  Accept: "application/json",
  /* Authorization: authorization_prefix + token || undefined*/
};
export const baseUrl = `${baseDomain}`;
export const imageUrl = `${imageDomain}`;
export const pdf = `${pdfUrl}`;
export default axios.create({
  baseUrl,
  headers: {
    Authorization: localStorage.getItem("auth_token"),
  },
});
export const serializeQuery = (query) => {
  try {
    return Object.keys(query)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
      )
      .join("&");
  } catch { }
};
