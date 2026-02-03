import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api"
});

// Add a request interceptor to include the Token in headers if it exists
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    // Log error to .NET Service
    const errorMsg = error.response
      ? `${error.config.method.toUpperCase()} ${error.config.url} failed: ${error.response.status} - ${JSON.stringify(error.response.data)}`
      : `Network Error: ${error.message}`;

    // Avoid infinite loop if logger service itself fails (though logger service calls port 5000, api calls port 8080)
    // But good to check if url is not logger url just in case
    if (!error.config.url.includes("port:5000")) {
      import("./services/logger.service").then(module => {
        module.default.error(errorMsg);
      });
    }

    return Promise.reject(error);
  }
);

export default API;
