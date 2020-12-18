import Component from '@glimmer/component';
import { arc } from "d3-shape";

export default class CommunityTreePersonComponent extends Component {
  age = this.args.person.exitYear - this.args.person.birthYear;

  get arc(){
    return arc()
    .innerRadius((this.args.i + 1) * 10)
    .outerRadius(100)
    .startAngle(this.args.i * 2 * Math.PI / this.args.dataLength)
    .endAngle((this.args.i + 1) * 2 * Math.PI / this.args.dataLength)();
  }
}
