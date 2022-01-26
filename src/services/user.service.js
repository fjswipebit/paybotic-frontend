import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_URL;

class UserService {
  getMerchants() {
    return axios.get(API_URL + 'all');
  }

  getCashAdvanceApplications() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getCashAdvances() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getPayments() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
