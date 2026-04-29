# 0002 — Data access

## Status

Accepted.

## Context

Provided database is MySQL 5 with one table. The data model is unlikely to grow beyond a handful of tables in the
foreseeable scope of this work.

## Decision

`mysql2/promise` with parameterised SQL. No ORM. Every query result is parsed by a Zod schema before it leaves the
repository.

## Alternatives considered

- **Prisma.** Strong developer experience at scale, but adds a generation step, a schema language, and a migration
  tool — overhead with no payoff at this size.
- **Drizzle.** Lighter than Prisma, but still adds a schema-as-code layer that pays off with many tables, not with one.

## Consequences

- SQL is visible in the repository — easy to read and easy to tune.
- Zod parsing at the boundary catches any drift between the schema and the code immediately, with a clear error.
- Switching to an ORM later is a contained change — it only affects the repository.
- The pool is created lazily and cached at module scope; route handlers do not manage connection lifecycle.
- Raw SQL is also a teaching choice. A mid joining the team can read the query and the Zod schema and ship a new
  repository function without learning ORM idioms.