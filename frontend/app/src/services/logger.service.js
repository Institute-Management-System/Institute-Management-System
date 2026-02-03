import axios from "axios";

const LOGGER_URL = import.meta.env.VITE_LOGGER_URL || "http://localhost:5000/api/log";

const LoggerService = {
    log: async (level, message) => {
        try {
            await axios.post(LOGGER_URL, {
                source: "Frontend",
                level: level,
                message: message,
            });
        } catch (error) {
            console.error("Failed to send log to .NET Service", error);
        }
    },

    info: (message) => LoggerService.log("INFO", message),
    error: (message) => LoggerService.log("ERROR", message),
    warn: (message) => LoggerService.log("WARN", message),
};

export default LoggerService;
