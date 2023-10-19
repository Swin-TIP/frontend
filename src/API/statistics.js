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

export const getStatistics = async (startDate, endDate) => {
    let format = 'yyyy-MM-DD'
    let startDateString = moment(startDate).format(format)
    let endDateString = moment(endDate).format(format)
    let response = await axios.get(
        `${API_URL}/session/statistics/${startDateString}/${endDateString}`,
        getHeaders()
    )
    return response.data
}
