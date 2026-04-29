# 0001 — Stack choice

## Status

Accepted.

## Context

A small task: list dashboards from MySQL, expose them as JSON, render a UI. The structure has to support quick
extension — adding an endpoint, a page, or a form should be one new file each.

## Decision

Next.js 16 (App Router) with TypeScript for both API and UI.

## Alternatives considered

- **Express + Vite SPA.** Simpler in isolation, but two projects to wire and a wasted internal HTTP hop between UI and
  API.
- **Spring Boot (Kotlin) + React SPA.** A better fit for a JVM-heavy stack, but heavy ceremony for one endpoint and
  forces a language switch between API and UI.

## Consequences

- The Server Component on `/` calls the data layer directly — no internal HTTP.
- The public `/api/dashboards` endpoint exists for the smoke-test contract and any external caller.
- I opt out of App Router caching on the page explicitly (`dynamic = 'force-dynamic'`) so freshness is the visible
  default.
- Adding routes is conventional file additions under `app/`.