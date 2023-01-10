# pact-consumer-example-for-typescript

> An example of writing contract test with `pact` and `jest-pact`.
>
> The app itself is not important, our goal is too **illustrated how straightforward it is to write a contract test**.
>
> Having an integration test that check on your HTTP client. with mock (`nock`, `msw`) is really close

## Tests Goal

> We aim to check we are able to do a `GET` request on `/api/customers` and  `/api/customer/:id/orders` and get the correct data shape.

| Test file                   | Description                                                                    | Benefits                                              |
| --------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------- |
| `index`                     | an integration test with a mock server ([msw])                                 | - check HTTP client's plumbing                        |
| `index-matcher-v2.contract` | a contract test using pact [specs@v2][specs-v2] and [matchers@v2][matchers-v2] | - check HTTP client's plumbing<br>- generate contract |
| `index-matcher-v3.contract` | a contract test using pact [specs@v3][specs-v3] and [matchers@v3][matchers-v3] | - check HTTP client's plumbing<br>- generate contract |

## Install

```console
❯ yarn install
```

## Usage

### Run Only _index.test.ts_

```console
❯ yarn test
```

### Run All contract tests

```console
❯ yarn test:contracts # both contract test files
```

### Run Only Pact@v2 test

```console
❯ jest --testMatch '**/*v2.contract.test.ts'
```

### Run Only Pact@v3 test

```console
❯ jest --testMatch '**/*v3.contract.test.ts'
```

## Publish contract

**requirements:** [just].

To publish you need to download the [Pact-CLI binary][pact-cli]:

```console
❯ just install-pact-cli
```

Then edit the `.env` to fill:

```
PACT_BROKER_URL=https://your.broker.org/
```

Finally, connect to VPN and publish:
```
❯ just publish-contract
```


## Repository Metadata

Follow the [How to Add repo URL and main branch metadata][add-metadata].


[msw]: https://github.com/mswjs/msw
[specs-v2]:https://github.com/pact-foundation/pact-specification/tree/version-2
[specs-v3]:https://github.com/pact-foundation/pact-specification/tree/version-3
[matchers-v2]: https://docs.pact.io/implementation_guides/javascript/docs/matching#v2-matching-rules
[matchers-v3]: https://docs.pact.io/implementation_guides/javascript/docs/matching#v3-matching-rules
[pact-cli]: https://github.com/pact-foundation/pact-ruby-standalone/releases
[just]: https://github.com/casey/just
[add-metadata]: https://manomano.atlassian.net/l/cp/GsiPEc4M