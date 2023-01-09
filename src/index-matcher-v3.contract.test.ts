import { pactWith } from 'jest-pact/dist/v3';
import { MatchersV3 as Matchers } from '@pact-foundation/pact';
import { api } from './index.js';

const CUSTOMERS_COUNT = 3;

pactWith(
  { consumer: 'ms.cart:with-pact@v3', provider: 'ms.customers' },
  (interaction) => {
    interaction('customers endpoint', ({ provider, execute }) => {
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
      })
      execute('some api call', (mockserver) =>
        api(mockserver.url)
          .getCustomers()
          .then((customers) => {
            // eslint-disable-next-line jest/no-standalone-expect
            expect(customers.length).toEqual(CUSTOMERS_COUNT);
          }),
      );
    });
  },
);
