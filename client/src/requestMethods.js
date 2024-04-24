import axios from "axios";
import { getUserFromLocalStorage } from "./localstorage";
// import { Token } from "@mui/icons-material";

const BASE_URL = "http://localhost:8000/api/";

// Access persisted data from localStorage
// const persistedData = localStorage.getItem("persist:root");
const user = getUserFromLocalStorage();
let TOKEN = null;
if (user) {
  try {
    // const parsedData = JSON.parse(persistedData);
    // const user = JSON.parse(parsedData.user);
    if (user  && user.accessToken) {
      TOKEN = user.accessToken;
    }
    console.log("Token => ",TOKEN)
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