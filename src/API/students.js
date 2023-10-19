import axios from 'axios'

const API_URL = 'https://swinburne-398109.ts.r.appspot.com/api'

const userToken = localStorage.getItem('token')

// Get all students
export const getStudents = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/list`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        return response.data
    } catch (error) {
        return new Error(error)
    }
}

// Get student details by their name
export const getStudentByName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/user/search/${name}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        return response.data
    } catch (error) {
        return new Error(error)
    }
}

export const updateStudentApproval = async (studentId, approve) => {
    try {
        const response = await axios.patch(
            `${API_URL}/user/approval/${studentId}`,
            { approve },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        )
        return response.data
    } catch (error) {
        return new Error(error)
    }
}
