import Component from '@glimmer/component';
import { arc } from "d3-shape";

export default class CommunityTreePersonComponent extends Component {
  age = this.args.person.exitYear - this.args.person.birthYear;

  get arc(){
    return arc()
    .innerRadius(0)
    .outerRadius(100)
    .startAngle(0)
    .endAngle(Math.PI / 2)();
  }
}
