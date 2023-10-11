import axios from "axios"

const API_URL = "https://swinburne-398109.ts.r.appspot.com/api"

export const postRequest = (inputText, token) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  const postData = {
    question: inputText
  }

  return axios.post(`${API_URL}/qna/ask/650cd8d2b9da4b40ef5f6a05`, postData, { headers })
}

export const getRequest = async (token) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  try {
    const response = await axios.get(`${API_URL}/qna/list/650cd8d2b9da4b40ef5f6a05`, { headers })
    return response.data
  } catch (error) {
    throw error
  }
}

export const patchStatus = (mark, token, qID) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  const patchStatus = {
    is_answered: mark
  }

  return axios.patch(`${API_URL}/qna/answer/${qID}`, patchStatus, { headers })
}