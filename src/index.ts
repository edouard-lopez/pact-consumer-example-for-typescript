import axios from 'axios';

export type Customer = { firstname: string; lastname: string };
export type Customers = Array<Customer>;
type Apis = {
  getCustomers: () => Promise<Customers>;
};

export const api = (baseUrl = 'http://localhost'): Apis => ({
  getCustomers: (): Promise<Customers> =>
    axios.get(`${baseUrl}/api/customers`).then((response) => response.data),
});
