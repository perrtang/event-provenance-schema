import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const load = async (path) => JSON.parse(await readFile(new URL(path, root), "utf8"));

test("schema declares a closed, versioned event contract", async () => {
  const schema = await load("schemas/event-provenance.schema.json");
  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
  assert.equal(schema.additionalProperties, false);
  assert.deepEqual(schema.required, ["schemaVersion", "eventId", "title", "status", "updatedAt", "sources", "licenseBoundary"]);
});

test("bundled examples preserve metadata-only and source-attributed boundaries", async () => {
  for (const path of ["examples/published-event.json", "examples/withdrawn-event.json"]) {
    const event = await load(path);
    assert.equal(event.schemaVersion, "0.1");
    assert.equal(event.licenseBoundary.articleTextIncluded, false);
    assert.ok(event.sources.every((source) => source.url.startsWith("https://")));
  }
});
