import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module(
  "Integration | Component | community-tree/gradients/person-gradient",
  function (hooks) {
    setupRenderingTest(hooks);

    test.skip("it renders", async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`<CommunityTree::Gradients::PersonGradient />`);

      assert.strictEqual(this.element.textContent.trim(), "");

      // Template block usage:
    });
  }
);
