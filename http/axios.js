import config from "../config";
import axios from "axios";

const backendHTTPHandler = axios.create({
  baseURL: config.serverURL,
  timeout: 5000,
  withCredentials: true,
});

export default backendHTTPHandler;

