import Component from '@glimmer/component';
import { interpolateWarm } from "d3-scale-chromatic";
import { scaleLinear } from "d3-scale";

export default class CommunityTreePersonGradientComponent extends Component {
  // this should be passed in by the parent component.
  colorScale() {
    return scaleLinear()
      .domain([0,80])
      .range([0,1]);
  }

  get stops() {
    const birthYear = this.args.person.birthYear;
    let ageAtStart = 0 
    if(birthYear < 1817 ){
      ageAtStart = 1817 - birthYear;
    }
    const ageAtExit = this.args.person.exitYear - this.args.person.birthYear;
    const stopScale = scaleLinear()
      .domain([0, 100])
      .range([ageAtStart, ageAtExit]);
    const offsets = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    return offsets.map(element => {
      return {
        offset: `${element}%`,
        style: `stop-opacity: 1; 
        stop-color: ${interpolateWarm(this.colorScale()(stopScale(element)))};`
      }
    });
  }

  //   const endingStop = interpolateWarm(this.colorScale()(
}
