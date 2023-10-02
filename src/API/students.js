import axios from "axios";

const API_URL = "https://swinburne-398109.ts.r.appspot.com/api";

// Get all students
const getStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/list`);
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

// Get student details by their name
const getStudentByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/user/search/${name}`);
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}
