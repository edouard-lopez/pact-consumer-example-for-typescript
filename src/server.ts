import { Customers } from './index.js';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const baseUrl = 'http://localhost';

const customers = rest.get(`${baseUrl}/api/customers`, (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      { id: 'uuid-0001', firstname: 'foo', lastname: 'bar' },
      { id: 'uuid-0002', firstname: 'Édouard', lastname: 'Lopez' },
      { id: 'uuid-0003', firstname: 'Guillaume', lastname: 'Camus' },
    ] as Customers),
  );
});

export const server = setupServer(customers);
