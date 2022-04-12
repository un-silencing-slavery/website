import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | information/sort-button", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Information::SortButton />`);

    assert.dom().includesText("");

    // Template block usage:
    await render(hbs`
      <Information::SortButton>
        template block text
      </Information::SortButton>
    `);

    assert.dom().includesText("template block text");
  });
});
