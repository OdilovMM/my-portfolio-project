import axios from "axios";

const localUrl = "http://localhost:5000";
const production = "";

const api = axios.create({
  baseURL: `${localUrl}/api/v1`,
});

export default api;
