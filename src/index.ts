import axios from 'axios';

export type uuid = string;
export type Customer = { id: uuid; firstname: string; lastname: string };
export type Customers = Array<Customer>;
export type CustomerOrder = { id: uuid; quantity: number };
export type CustomerOrders = { customer: uuid; orders: Array<CustomerOrder> };

type Apis = {
  getCustomers: () => Promise<Customers>;
  getCustomerOrders: (customer: uuid) => Promise<CustomerOrders>;
};

export const api = (baseUrl = 'http://localhost'): Apis => ({
  getCustomers: (): Promise<Customers> =>
    axios.get(`${baseUrl}/api/customers`).then((response) => response.data),

  getCustomerOrders: (customer: uuid): Promise<CustomerOrders> =>
    axios
      .get(`${baseUrl}/api/customer/${customer}/orders`)
      .then((response) => response.data),
});
