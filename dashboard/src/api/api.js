import axios from "axios";

const api = axios.create({
  baseURL: "https://multi-vendor-shop.onrender.com",
});

export default api;
