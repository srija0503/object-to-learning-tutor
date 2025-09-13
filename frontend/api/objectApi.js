import axios from 'axios';
import { Platform } from 'react-native';

// -------- CONFIGURE THESE ----------
const LOCALHOST_API_PORT = 5000; // port your backend runs on
const LAN_IP = '192.168.x.x'; // replace with your computer's LAN IP
// ---------------------------------

// Determine the correct API URL based on platform
let API_URL = '';

if (Platform.OS === 'android') {
  // Android emulator
  API_URL = `http://10.0.2.2:${LOCALHOST_API_PORT}/api`;
} else if (Platform.OS === 'ios') {
  // iOS simulator can use localhost
  API_URL = `http://localhost:${LOCALHOST_API_PORT}/api`;
} else {
  // Physical device or other platforms
  // Use LAN IP
  API_URL = `http://${LAN_IP}:${LOCALHOST_API_PORT}/api`;
}

console.log('Using API_URL:', API_URL);

const objectApi = {
  getObjectInfo: async (imageBase64) => {
    try {
      const res = await axios.post(
        `${API_URL}/object/recognize`,
        { image: imageBase64 },
        { timeout: 15000 }
      );
      console.log('API response:', res.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching object info:', error.message);
      if (error.response) console.error('Response data:', error.response.data);
      throw error;
    }
  },

  getQuiz: async (objectName) => {
    try {
      const res = await axios.get(`${API_URL}/quiz/${objectName}`, { timeout: 10000 });
      console.log('Quiz API response:', res.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching quiz:', error.message);
      if (error.response) console.error('Response data:', error.response.data);
      throw error;
    }
  },
};

export default objectApi;
