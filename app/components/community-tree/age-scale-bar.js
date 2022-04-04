import Component from "@glimmer/component";
import { inject as service } from "@ember/service";

export default class CommunityTreeAgeScaleBarComponent extends Component {
  @service svg;

  tickLength = 10;

  barHeight = 25;

  tickOffset = 4;
}
