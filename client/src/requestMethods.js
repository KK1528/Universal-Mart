import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

// Access persisted data from localStorage
const persistedData = localStorage.getItem("persist:root");
let TOKEN = null;
if (persistedData) {
  try {
    const parsedData = JSON.parse(persistedData);
    const user = JSON.parse(parsedData.user);
    if (user && user.currentUser && user.currentUser.accessToken) {
      TOKEN = user.currentUser.accessToken;
    }
  } catch (error) {
    console.error("Error parsing persisted data:", error);
  }
}

// Create axios instances
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});


export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});