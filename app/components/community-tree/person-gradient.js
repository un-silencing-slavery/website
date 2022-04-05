import Component from "@glimmer/component";
import { htmlSafe } from "@ember/template";
import { scaleLinear } from "d3-scale";
import { service } from "@ember/service";

export default class CommunityTreePersonGradientComponent extends Component {
  @service svg;

  // this should be passed in by the parent component.
  colorScale() {
    return scaleLinear().domain([0, 80]).range([0, 1]);
  }

  get stops() {
    const birthYear = this.args.person.birthYear;
    let ageAtStart = 0;
    if (birthYear < 1817) {
      ageAtStart = 1817 - birthYear;
    }
    const ageAtExit = this.args.person.exitYear - this.args.person.birthYear;
    const stopScale = scaleLinear()
      .domain([0, 100])
      .range([ageAtStart, ageAtExit]);
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

  //   const endingStop = interpolateRdPu(this.colorScale()(
}
