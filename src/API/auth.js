import axios from "axios";

const API_URL = "https://swinburne-398109.ts.r.appspot.com/api";

export const login = async (email, password) => {
    const body = {
        email,
        password
    };
    try {
        const response = await axios.post(`${API_URL}/user/auth`, body);
        const {
            role,
            accessToken
        } = response.data;

        return {
            role,
            accessToken
        };
    } catch (error) {
        console.error(error);
        return new Error(error);
    };
};

export const register = async (name, email, password, grade) => {
    const body = {
        name,
        email,
        password,
        grade
    };
    try {
        const response = await axios.post(`${API_URL}/student/register`, body);
        return response.data;
    } catch (error) {
        console.error(error);
        return new Error(error);
    };
};