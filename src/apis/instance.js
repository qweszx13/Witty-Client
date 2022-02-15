import axios from "axios";

const BASE_URL = "http://localhost:8088";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export default instance;
