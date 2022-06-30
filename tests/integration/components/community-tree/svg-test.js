import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | community-tree/svg", function (hooks) {
  setupRenderingTest(hooks);

  test.skip("it renders", async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<CommunityTree::Svg />`);

    assert.dom().hasText("");

    // Template block usage:
    await render(hbs`
      <CommunityTree::Svg>
        template block text
      </CommunityTree::Svg>
    `);

    assert.dom().hasText("template block text");
  });
});
