import axios from "axios";
import { apiBase } from "./google-api";

const instance = axios.create({
  baseURL: apiBase,
});

export default instance;
