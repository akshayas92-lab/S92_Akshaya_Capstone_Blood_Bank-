const assert = require("node:assert/strict");
const test = require("node:test");
const User = require("../models/User");

test("user password hashes are excluded from default queries", () => {
  assert.equal(User.schema.path("password").options.select, false);
});

test("authentication queries can explicitly select the password hash", () => {
  const query = User.findOne({ username: "donor" }).select("+password");

  assert.deepEqual(query.projection(), { "+password": 1 });
});
