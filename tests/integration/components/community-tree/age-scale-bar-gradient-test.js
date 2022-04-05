import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module(
  "Integration | Component | community-tree/age-scale-bar-gradient",
  function (hooks) {
    setupRenderingTest(hooks);

    test.skip("it renders", async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`<CommunityTree::AgeScaleBarGradient />`);

      assert.strictEqual(this.element.textContent.trim(), "");

      // Template block usage:
      await render(hbs`
      <CommunityTree::AgeScaleBarGradient>
        template block text
      </CommunityTree::AgeScaleBarGradient>
    `);

      assert.strictEqual(
        this.element.textContent.trim(),
        "template block text"
      );
    });
  }
);
