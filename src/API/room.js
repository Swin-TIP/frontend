import { User } from '../store/user';
import axios from 'axios';

const API_URL = 'https://swinburne-398109.ts.r.appspot.com/api';

function getHeaders() {
    return {
        headers: {
            Authorization: `Bearer ${User.getToken()}`
        }
    }
}

export const getAllRooms = async function () {
    let response = await axios.get(`${API_URL}/room/list`, getHeaders());
    return response.data;
}

export const createNewRoom = async function (name, capacity) {
    let response = await axios.post(
        `${API_URL}/room/create`,
        {
            name: name,
            capacity: capacity
        },
        getHeaders()
    )
    return response.data
}

export const getRoomOccupancy = async (startDate, endDate) => {
    const userToken = User.getToken();
    try {
        const response = await axios.get(`${API_URL}/room/list/occupancy/${startDate}/${endDate}`,
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
