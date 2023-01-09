import { Customers, CustomerOrders } from './index.js';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const baseUrl = 'http://localhost';

const customers = rest.get(`${baseUrl}/api/customers`, (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      {
        id: '6490427a-22b0-48c5-a2cd-9537f3833ea7',
        firstname: 'foo',
        lastname: 'bar',
      },
      {
        id: '2099d96b-1693-4f6f-b218-130238346855',
        firstname: 'Édouard',
        lastname: 'Lopez',
      },
      {
        id: 'f0652df4-e831-4d10-9692-f386f08ad170',
        firstname: 'Guillaume',
        lastname: 'Camus',
      },
    ] as Customers),
  );
});

const customerOrders = rest.get(
  `${baseUrl}/api/customer/:customerId/orders`,
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        customer: req.params?.customerId,
        orders: [
          { id: '591267ed-908a-440f-889c-60349a11506a', quantity: 2 },
          { id: 'bddb4566-b025-4f1c-9784-802402e5ea9b', quantity: 4 },
        ],
      } as CustomerOrders),
    );
  },
);

export const server = setupServer(customers, customerOrders);
