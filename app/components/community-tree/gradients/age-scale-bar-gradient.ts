import Component from "@glimmer/component";
import { htmlSafe } from "@ember/template";
import { scaleLinear } from "d3";
import { service } from "@ember/service";
import SvgService from "un-silencing-slavery-at-rose-hall/services/svg";

export default class CommunityTreeAgeScaleBarGradientComponent extends Component {
  @service declare svg: SvgService;

  colorScale() {
    return scaleLinear().domain([0, 80]).range([0, 1]);
  }

  get stops() {
    const stopScale = scaleLinear().domain([0, 100]).range([0, 80]);
    const offsets = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    return offsets.map((element) => {
      return {
        offset: `${element}%`,
        style: htmlSafe(`stop-opacity: 1; 
        stop-color: ${this.svg.gradient(
          this.colorScale()(stopScale(element))
        )};`),
      };
    });
  }
}
