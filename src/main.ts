import axios from 'axios';

export const api = (baseUrl = 'http://localhost'): any => ({
  getCustomers: (): any =>
    axios.get(`${baseUrl}/api/customers`).then((response) => response.data),
});
