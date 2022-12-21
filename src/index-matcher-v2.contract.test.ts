import { pactWith } from 'jest-pact';
import { Matchers } from '@pact-foundation/pact';
import { api } from './index.js';

pactWith(
  { consumer: 'ms.cart:with-pact@v2', provider: 'ms.customers' },
  (provider) => {
    let client;
    const CUSTOMERS_COUNT = 3;
    beforeEach(() => {
      client = api(provider.mockService.baseUrl);
    });

    beforeEach(() =>
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
      }),
    );

    describe('customers endpoint', () => {
      it('returns customers', async () => {
        client = api(provider.mockService.baseUrl);

        await client.getCustomers().then((customers) => {
          expect(customers.length).toEqual(CUSTOMERS_COUNT);
        });
      });
    });
  },
);
