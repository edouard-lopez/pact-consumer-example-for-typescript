import { pactWith } from 'jest-pact/dist/v3';
import { MatchersV3 as Matchers } from '@pact-foundation/pact';
import { api } from './index.js';

const CUSTOMERS_COUNT = 3;

pactWith(
  { consumer: 'ms.cart:with-pact@v3', provider: 'ms.customers' },
  (interaction) => {
    interaction('returns customers', ({ provider, execute }) => {
      provider
        .given('Customers are available')
        .uponReceiving('A request for API customers')
        .withRequest({
          method: 'GET',
          path: '/api/customers',
        })
        .willRespondWith({
          status: 200,
          body: Matchers.constrainedArrayLike(
            { firstname: 'foo', lastname: 'bar' },
            CUSTOMERS_COUNT,
            CUSTOMERS_COUNT,
          ),
        });
      execute('some api call', (mockserver) =>
        api(mockserver.url)
          .getCustomers()
          .then((customers) => {
            // eslint-disable-next-line jest/no-standalone-expect
            expect(customers.length).toEqual(CUSTOMERS_COUNT);
          }),
      );
    });

    interaction("returns customer' orders", ({ provider, execute }) => {
      const CUSTOMER_ORDERS_COUNT = 2;

      provider
        .given('Customers orders are available')
        .uponReceiving('A request for API customer-orders')
        .withRequest({
          method: 'GET',
          path: '/api/customer/2099d96b-1693-4f6f-b218-130238346855/orders',
        })
        .willRespondWith({
          status: 200,
          body: {
            customer: Matchers.uuid('2099d96b-1693-4f6f-b218-130238346855'),
            orders: Matchers.eachLike(
              {
                id: Matchers.string('bddb4566-b025-4f1c-9784-802402e5ea9b'),
                quantity: Matchers.integer(2),
              },
              CUSTOMER_ORDERS_COUNT,
            ),
          },
        });
      execute('some api call', (mockserver) =>
        api(mockserver.url)
          .getCustomerOrders('2099d96b-1693-4f6f-b218-130238346855')
          .then((customer_orders) => {
            /* eslint-disable jest/no-standalone-expect */
            expect(customer_orders.customer).toBe(
              '2099d96b-1693-4f6f-b218-130238346855',
            );
            expect(customer_orders.orders.length).toBe(CUSTOMER_ORDERS_COUNT);
            /* eslint-enable jest/no-standalone-expect */
          }),
      );
    });
  },
);
