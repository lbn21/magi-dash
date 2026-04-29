# 0003 — Error handling

## Status

Accepted.

## Context

Route handlers will multiply over time. Inconsistent error shapes are the most common source of frontend bugs in admin
UIs — "why is this an HTTP 200 with `{ error: ... }` here and a 500 there?".

## Decision

A small `lib/errors.ts` with a typed `AppError` base, named subclasses for the cases I needed (`NotFoundError`,
`ValidationError`), and a single `toErrorResponse` translator. Every route handler wraps its body in `try/catch` and
delegates to the translator on failure.

## Response shape

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Dashboard 42 not found",
    "details": null
  }
}
```

## Consequences

- All endpoints share one response shape; the UI does not need to handle every shape separately.
- Adding a new error type is one class, zero changes to existing routes.
- Unexpected (non-`AppError`) failures log to stderr and return a generic 500 — internal details do not leak to the
  client.
- The explicit `try/catch` per handler is easier to read for someone seeing the code for the first time than a
  higher-order wrapper. I would promote it to a wrapper when the number of handlers makes the repetition worth removing.