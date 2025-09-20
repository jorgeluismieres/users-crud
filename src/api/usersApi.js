import axios from "axios";

const api = axios.create({
  baseURL: "https://users-crud-api-production-9c59.up.railway.app/api/v1",
});

export default api;
