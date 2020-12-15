import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7000",
});

export default api;
