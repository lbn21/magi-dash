# MagiDash

Small Next.js app that lists dashboards from MySQL. Built for the MagiDash Corp interview brief — see [
`BRIEF.md`](./BRIEF.md).

Stack: Next.js 16 (App Router), TypeScript, mysql2/promise (no ORM), Zod, Vitest.

## Run

```bash
docker-compose up --force-recreate --build
```

- UI: http://localhost/
- JSON: http://localhost/api/dashboards
- Health: http://localhost/api/health

Tear down with `docker-compose down -v`. The `-v` wipes the DB volume so the seed re-applies on the next `up`.

## Develop

```bash
npm install
docker-compose up mysql-db -d
npm run dev
```

Set `DB_HOST=127.0.0.1` in `.env.local` so the dev server reaches the compose-managed DB.

## Test

```bash
npm test
npm run typecheck
```

## Smoke tests

```bash
./smoke_tests.sh
```

## Decisions

Short ADRs for the choices that are not obvious from the code:

- [0001 — Stack choice](./docs/adr/0001-stack-choice.md)
- [0002 — Data access](./docs/adr/0002-data-access.md)
- [0003 — Error handling](./docs/adr/0003-error-handling.md)
- [0004 — Testing strategy](./docs/adr/0004-testing-strategy.md)

## Notes

Built and tested on macOS (Apple Silicon, Docker Desktop). The `mysql:5` image runs under Rosetta via
`platform: linux/amd64` — first boot of the DB is slower because of that.