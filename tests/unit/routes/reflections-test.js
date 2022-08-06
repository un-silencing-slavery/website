import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Route | reflections", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    let route = this.owner.lookup("route:reflections");
    assert.ok(route);
  });
});
