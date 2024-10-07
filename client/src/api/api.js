import axios from 'axios';
import config from '../config';

const backend_api = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 500000,
  headers: {
    'Content-Type': 'application/json',
  }
});

const sendChatMessage = async (chatId, message) => {
  try {
    const response = await backend_api.post(`chat/${chatId}`, { chatQuery: message });
    return response.data;
  } catch (error) {
    console.error('Error in sendChatMessage:', error);
    throw error;
  }
};

export const getAIMessage = async (userQuery) => {
  try {
    const message = await sendChatMessage("1234", userQuery);
    return message;
  } catch (error) {
    console.error('Error in getAIMessage:', error);
    throw error;
  }
};

export const updateWebpage = async (chatId, pageUrl, product, parsedContent) => {
  try {
    const response = await backend_api.post(`chat/${chatId}/update-webpage`, { pageUrl, product, parsedContent });
    return response.data;
  } catch (error) {
    console.error('Error in updateWebpage:', error);
    throw error;
  }
};