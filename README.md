# event-provenance-schema

Open JSON Schemas for publishing traceable public-information events without republishing source text.

This repository defines a small interchange format for an event, its source references, update notices, and an optional durable story thread. It is designed for civic-tech tools, research workflows, and news-navigation products that need to preserve **what supports an event** and **what later changed**.

## Included

- `schemas/event-provenance.schema.json` — an event record with sources and notices.
- `examples/published-event.json` — fictional, safe-to-reuse example data.
- `examples/withdrawn-event.json` — a withdrawal notice example.
- `test/schema-contract.test.mjs` — dependency-free contract checks.

## Design principles

- Preserve source URL, publisher, publication time, and source role.
- Keep event summaries distinct from the original publisher text.
- Carry corrections, withdrawals, and license changes forward as data notices.
- Model uncertainty with explicit status instead of silently deleting audit history.
- Do not include article bodies, hidden reasoning, credentials, or personal data.

## Quick start

```js
const event = await fetch("https://example.org/events/evt_123").then((response) => response.json());

for (const source of event.sources) {
  console.log(source.role, source.url);
}
```

The schema is an interchange contract, not a fact-checking system or a licence to redistribute third-party publisher content. Implementers remain responsible for attribution, source terms, privacy, defamation, correction, and deletion obligations.

## Validate the bundled examples

```bash
npm test
```

For production, use a JSON Schema validator that supports Draft 2020-12 and validate both producer and consumer payloads.

## License

[MIT](LICENSE)
Open JSON Schemas for traceable public-information events, sources, corrections, and withdrawals.
