import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerbuilderfun-default-rtdb.firebaseio.com",
});

export default instance;
