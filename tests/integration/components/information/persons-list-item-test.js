import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module(
  "Integration | Component | information/persons-list-item",
  function (hooks) {
    setupRenderingTest(hooks);

    test.skip("it renders", async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`<Information::PersonsListItem />`);

      assert.dom().containsText("");

      // Template block usage:
      await render(hbs`
      <Information::PersonsListItem>
        template block text
      </Information::PersonsListItem>
    `);

      assert.dom().containsText("template block text");
    });
  }
);
