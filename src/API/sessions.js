import axios from "axios";

const API_URL = "https://swinburne-398109.ts.r.appspot.com/api";

const userToken = localStorage.getItem('token');

export const getSessionsFromDates = async (startDate, endDate) => {
    try {
        const response = await axios.get(`${API_URL}/session/list/${startDate}/${endDate}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return new Error(error);
    };
};

export const getSessionDetails = async (sessionId) => {
    try {
        const response = await axios.get(`${API_URL}/session/${sessionId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return new Error(error);
    };
};

export const getRegisteredSessions = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/session/list`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return new Error(error);
    };
};