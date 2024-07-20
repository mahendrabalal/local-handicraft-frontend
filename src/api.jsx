// src/api.js
import axios from 'axios';

// Get the API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Function to fetch greeting from backend
export const getGreeting = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/greeting`);
    return response.data;
  } catch (error) {
    console.error('Error fetching greeting:', error);
    throw error;
  }
};
