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
});
