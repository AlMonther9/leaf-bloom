import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY2; // Ensure this is properly set in your environment variables
const BASE_URL = 'https://perenual.com/api';

// Function to fetch plant list with optional filters and pagination
export const getPlants = async (page = 1, filters = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/species-list`, {
      params: {
        key: API_KEY,
        page,
        ...filters
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching plants:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to fetch detailed plant data by species ID
export const getPlantDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/species/details/${id}`, {
      params: {
        key: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching plant details:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to search plants by query string
export const searchPlants = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/species-list`, {
      params: {
        key: API_KEY,
        q: query
      }
    });
    console.log('Search response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error searching plants:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to fetch pest and disease list with optional query and pagination
export const getPestDiseaseList = async (page = 1, query = '') => {
  try {
    const response = await axios.get(`${BASE_URL}/pest-disease-list`, {
      params: {
        key: API_KEY,
        page,
        q: query
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pest/disease list:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to fetch care guides by species ID with optional pagination
export const getCareGuides = async (speciesId, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/species-care-guide-list`, {
      params: {
        key: API_KEY,
        species_id: speciesId,
        page
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching care guides:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to fetch FAQs with optional query and pagination
export const getFAQs = async (page = 1, query = '') => {
  try {
    const response = await axios.get(`${BASE_URL}/article-faq-list`, {
      params: {
        key: API_KEY,
        page,
        q: query
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching FAQs:', error.response ? error.response.data : error.message);
    throw error;
  }
};
