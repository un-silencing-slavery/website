import Component from '@glimmer/component';
import { arc } from "d3-shape";

export default class CommunityTreePersonComponent extends Component {
  age = this.args.person.exitYear - this.args.person.birthYear;

  get arc(){
    return arc()
    .innerRadius(this.scaledArrivalYear)
    .outerRadius(this.args.yearScale(this.args.person.exitYear))
    .padAngle(Math.PI / 270)
    .startAngle(this.args.i * 2 * Math.PI / this.args.dataLength)
    .endAngle((this.args.i + 1) * 2 * Math.PI / this.args.dataLength)();
  }

  get scaledArrivalYear(){
    let year = 1817;
    if (this.args.person.birthYear > 1817) {
      year = this.args.person.birthYear;
    }

    return this.args.yearScale(year)
  }

}
