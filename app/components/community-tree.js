import Component from '@glimmer/component';
import { scaleLinear } from "d3-scale";

export default class CommunityTreeComponent extends Component {
  width = 400;

  height = 400;

  dataLength = this.args.data.length;

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
}
