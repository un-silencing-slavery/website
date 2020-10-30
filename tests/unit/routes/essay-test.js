import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | essay', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:essay');
    assert.ok(route);
  });
});
