import axios from "axios";

const API_URL = "https://swinburne-398109.ts.r.appspot.com/api";

export const postRequest = (inputText, token, sID) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  const postData = {
    question: inputText
  }

  return axios.post(`${API_URL}/qna/ask/${sID}`, postData, { headers })
}

export const getRequest = async (token, sID) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  try {
    const response = await axios.get(`${API_URL}/qna/list/${sID}`, { headers })
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

export const patchVote = async (token, qID) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'question_id': `${qID}`
  }
  const body = {
    "vote": true
  }

  try {
    return axios.patch(`${API_URL}/qna/vote/${qID}`, body, { headers })
  } catch (error) {
    throw error
  }
}