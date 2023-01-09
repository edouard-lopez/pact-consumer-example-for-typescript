import { api } from './index.js';
import { server, baseUrl } from './server.js';

let client;
beforeEach(() => (client = api(baseUrl)));
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('customers endpoint', () => {
  it('returns customers', async () => {
    const CUSTOMERS_COUNT = 3;

    await client.getCustomers().then((customers) => {
      expect(customers.length).toEqual(CUSTOMERS_COUNT);
    });
  });

  it('returns customer-orders', async () => {
    const CUSTOMER_ORDERS_COUNT = 2;

    await client
      .getCustomerOrders('2099d96b-1693-4f6f-b218-130238346855')
      .then((customer_orders) => {
        expect(customer_orders.customer).toBe(
          '2099d96b-1693-4f6f-b218-130238346855',
        );
        expect(customer_orders.orders.length).toBe(CUSTOMER_ORDERS_COUNT);
      });
  });
});
