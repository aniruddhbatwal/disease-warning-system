import axios from "axios";

const API = axios.create({
  baseURL: "https://disease-warning-system-1.onrender.com/api"
});

export default API;
