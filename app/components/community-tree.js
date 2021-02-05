import Component from '@glimmer/component';
import { scaleLinear } from "d3-scale";
import { interpolateCool } from "d3-scale-chromatic";

export default class CommunityTreeComponent extends Component {
  width = 400;

  height = 400;

  dataLength = this.args.data.length;

  get beginningStop(){
    return `stop-color: ${interpolateCool(0)}; `;
  }

  get endingStop(){
    return `stop-color: ${interpolateCool(1)}; `;
  }

  get colorScale() {
    return scaleLinear()
      .domain([0,15])
      .range([0,1]);
  }

  get yearScale() {
    return scaleLinear()
      .domain([1810, 1832])
      .range([0, this.height / 2]);
  }

  // transform(i) {
  //   const string = `translate(25,${i * 10})`;
  //   console.log(string);
  // return string;
// }
  //
}
