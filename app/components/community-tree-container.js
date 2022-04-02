import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class CommunityTreeContainerComponent extends Component {
  @tracked svgWidth = 200;

  @tracked svgHeight = 200;

  @action calculateSizes({ contentRect }) {
    if (contentRect) {
      this.svgWidth = Math.floor(contentRect.width);
      this.svgHeight = Math.floor(contentRect.height);
    }
  }
}
