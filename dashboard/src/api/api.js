import axios from "axios";

const production = "https://multi-vendor-shop.onrender.com";

const api = axios.create({
  baseURL: `${production}/api/v1`,
});

export default api;
