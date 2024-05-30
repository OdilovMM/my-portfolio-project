import axios from "axios";

const localUrl = "http://localhost:5000";
const production = "https://multi-vendor-shop.onrender.com";

const api = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: `${production}/api/v1`,
});

export default api;
