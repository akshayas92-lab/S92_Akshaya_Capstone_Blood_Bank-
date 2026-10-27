const assert = require("node:assert/strict");
const test = require("node:test");
const { normalizeAiRequestDraft } = require("../utils/aiRequestAutocomplete");

test("AI request suggestions retain only valid values", () => {
  assert.deepEqual(
    normalizeAiRequestDraft({
      bloodGroup: "O+",
      unitsRequired: 2,
      hospitalName: "City Hospital",
      location: "Chennai",
      urgency: "critical",
    }),
    {
      bloodGroup: "O+",
      unitsRequired: 2,
      hospitalName: "City Hospital",
      location: "Chennai",
      urgency: "critical",
    }
  );
});

test("invalid or missing AI suggestions become empty draft fields", () => {
  assert.deepEqual(
    normalizeAiRequestDraft({
      bloodGroup: "unknown",
      unitsRequired: 0,
      hospitalName: "x".repeat(121),
      location: "",
      urgency: "immediate",
    }),
    {
      bloodGroup: null,
      unitsRequired: null,
      hospitalName: null,
      location: null,
      urgency: null,
    }
  );
});

test("AI request suggestions must be a JSON object", () => {
  assert.throws(() => normalizeAiRequestDraft(null), /must be an object/);
  assert.throws(() => normalizeAiRequestDraft([]), /must be an object/);
});
