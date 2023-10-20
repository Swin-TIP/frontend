import axios from "axios";
import { User } from '../store/user';

const API_URL = "https://swinburne-398109.ts.r.appspot.com/api";

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
    const userToken = User.getToken();
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

export const registerForSession = async (sessionId) => {
    const userToken = User.getToken();
    try {
        const body = {
            enroll: true
        };
        const response = await axios.patch(`${API_URL}/session/enrollment/${sessionId}`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return new Error(error);
    };
};

export const withdrawFromSession = async (sessionId) => {
    const userToken = User.getToken();
    try {
        const body = {
            enroll: false
        };
        const response = await axios.patch(`${API_URL}/session/enrollment/${sessionId}`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return new Error(error);
    };
};