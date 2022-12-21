import { api } from './main.js';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const baseUrl = 'http://localhost';

const server = setupServer(
  rest.get(`${baseUrl}/api/customers`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { firstname: 'foo', lastname: 'bar' },
        { firstname: 'Édouard', lastname: 'Lopez' },
        { firstname: 'Guillaume', lastname: 'Camus' },
      ]),
    );
  }),
);

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
