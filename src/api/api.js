import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY2;
const BASE_URL = 'https://perenual.com/api';

export const getPlants = async (page = 1, filters = {}) => {
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      page,
      ...filters
    });
    const response = await axios.get(`${BASE_URL}/species-list?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching plants:', error);
  }
};

export const getPlantDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/species/details/${id}?key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching plant details:', error);
  }
};

export const searchPlants = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/species-list?key=${API_KEY}&q=${query}`);
    console.log('Search response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error searching plants:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getPestDiseaseList = async (page = 1, query = '') => {
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      page,
      q: query
    });
    const response = await axios.get(`${BASE_URL}/pest-disease-list?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pest/disease list:', error);
  }
};

export const getCareGuides = async (speciesId, page = 1) => {
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      species_id: speciesId,
      page
    });
    const response = await axios.get(`${BASE_URL}/species-care-guide-list?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching care guides:', error);
  }
};

export const getFAQs = async (page = 1, query = '') => {
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      page,
      q: query
    });
    const response = await axios.get(`${BASE_URL}/article-faq-list?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
  }
};