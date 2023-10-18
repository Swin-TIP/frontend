import axios from "axios";

const API_URL = "https://swinburne-398109.ts.r.appspot.com/api";

export const getTutor = async (token) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  const params = {
    'page': 0,
    'limit': 100,
    'role': 'TUTOR'
  }

  try {
    const response = await axios.get(`${API_URL}/user/list`, { headers, params })
    return response.data
  } catch (error) {
    throw error
  }
}

export const createTutor = async (name, email, password, expertise) => {
  const body = {
    name,
    email,
    password,
    expertise
  };
  try {
    const response = await axios.post(`${API_URL}/tutor/register`, body);
    return response.data
  } catch (error) {
    console.error(error);
    return new Error(error);
  };
}

export const approveTutor = async (token, approve, user_id) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    "_id": user_id
  }
  const approval = {
    "approve": !approve
  }
  try {
    return await axios.patch(`${API_URL}/user/approval/${user_id}`, approval, { headers })
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
}