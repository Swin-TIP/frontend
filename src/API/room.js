const API_URL = 'https://swinburne-398109.ts.r.appspot.com/api'
import { User } from '../store/user'
import axios from 'axios'
import moment from 'moment'

function getHeaders() {
    return {
        headers: {
            Authorization: `Bearer ${User.getToken()}`
        }
    }
}

export const getAllRooms = async function () {
    let response = await axios.get(`${API_URL}/room/list`, getHeaders())
    return response.data
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
