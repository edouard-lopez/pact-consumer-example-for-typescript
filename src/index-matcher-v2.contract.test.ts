import { pactWith } from 'jest-pact';
import { Matchers } from '@pact-foundation/pact';
import { api } from './index.js';

pactWith(
  {
    consumer: 'ms.pact-consumer-example-for-typescript:with-pact@v2',
    provider: 'ms.customers',
  },
  (provider) => {
    let client;
    beforeEach(() => {
      client = api(provider.mockService.baseUrl);
    });

    describe('customers endpoint', () => {
      it('returns customers', async () => {
        const CUSTOMERS_COUNT = 3;

        provider.addInteraction({
          state: 'Customers are available',
          uponReceiving: 'A request for API customers',
          willRespondWith: {
            status: 200,
            body: Matchers.eachLike(
              { firstname: 'foo', lastname: 'bar' },
              { min: CUSTOMERS_COUNT },
            ),
          },
          withRequest: {
            method: 'GET',
            path: '/api/customers',
          },
        });

        client = api(provider.mockService.baseUrl);

        await client.getCustomers().then((customers) => {
          expect(customers.length).toEqual(CUSTOMERS_COUNT);
        });
      });

      it("returns customer' orders", async () => {
        const CUSTOMER_ORDERS_COUNT = 3;
        provider.addInteraction({
          state: 'Customers orders are available',
          uponReceiving: 'A request for API customer-orders',
          willRespondWith: {
            status: 200,
            body: {
              customer: Matchers.uuid('2099d96b-1693-4f6f-b218-130238346855'),
              orders: Matchers.eachLike(
                {
                  id: Matchers.string('bddb4566-b025-4f1c-9784-802402e5ea9b'),
                  quantity: Matchers.integer(2),
                },
                { min: CUSTOMER_ORDERS_COUNT },
              ),
            },
          },
          withRequest: {
            method: 'GET',
            path: '/api/customer/2099d96b-1693-4f6f-b218-130238346855/orders',
          },
        });

        client = api(provider.mockService.baseUrl);

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
  },
);
