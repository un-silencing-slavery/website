import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";

export default class CommunityTreeContainerComponent extends Component {
  @service svg;

  @service data;

  @action calculateSizes({ contentRect }) {
    if (contentRect) {
      this.svg.width = Math.floor(contentRect.width);
      this.svg.height = Math.floor(contentRect.height);
    }
  }
}
