import axios from "axios";

const API_URL = "https://swinburne-398109.ts.r.appspot.com/api";

export const getSessionsFromDate = async (startDate, endDate) => {
    try {
        const response = await axios.get(`${API_URL}/api/session/list/${startDate}/${endDate}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return new Error(error);
    };
};

export const getSessionDetails = async (sessionId) => {
    try {
        const response = await axios.get(`${API_URL}/api/session/${sessionId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return new Error(error);
    };
};