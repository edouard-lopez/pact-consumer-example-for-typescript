import {api} from './main.js';

  let client;

  beforeEach(() => {
    client = api('http://localhost/')
  });

  describe('health endpoint', () => {
    it('returns server health', () => // implicit return again
      client.getHealth().then(health => {
        expect(health).toEqual('up');
      }));
    });