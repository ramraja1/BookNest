import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, JSON.stringify(userData), {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Axios Error:", error.response?.data || error);
    throw error.response?.data || { message: "Something went wrong!" };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, JSON.stringify(userData), {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong!" };
  }
};
