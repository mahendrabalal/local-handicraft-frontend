import axios from 'axios';
import { API_URL } from '../config';

// Fetch all products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/products`);
        // Check if response is valid
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Propagate error to the caller
    }
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/api/products/${id}`);
        // Check if response is valid
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error; // Propagate error to the caller
    }
};

