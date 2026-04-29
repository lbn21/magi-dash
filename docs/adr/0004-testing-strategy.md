# 0004 — Testing strategy

## Status

Accepted.

## Context

Tests need to demonstrate the layered approach and give future iterations a clear pattern to follow — not aim for
coverage at this size.

## Decision

Vitest + Testing Library, one test in each layer:

- **Repository.** Mock the DB pool. Assert that the query result is parsed correctly and that malformed rows are
  rejected.
- **Route handler.** Mock the repository. Assert the response status and body for the happy path and an unknown-error
  path.
- **Page.** Mock the repository. Render the Server Component and assert content.

Stub at the next layer down, never reach across two layers.

## Alternatives considered

- **Real-DB integration via Testcontainers.** High signal but high setup cost — postponed to future work.
- **End-to-end via Playwright.** Same trade-off, postponed for the same reason.

## Consequences

- Mocking at the next layer down keeps the tests fast and means they do not need to know about the layer above.
- I accept that a SQL bug will only fail in the smoke test, not in unit tests. The trade-off is documented;
  Testcontainers closes that gap later.