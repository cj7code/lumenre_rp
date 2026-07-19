/**
 * ==========================================================
 * api/axios.js
 * ----------------------------------------------------------
 * Central Axios configuration for API communication.
 * ==========================================================
 */

import axios from "axios";


const API = axios.create({

  baseURL: import.meta.env.VITE_API_URL

});


export default API;