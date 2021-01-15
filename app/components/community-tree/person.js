import Component from '@glimmer/component';
import { arc } from "d3-shape";
import { schemeCategory10 } from "d3-scale-chromatic";

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

  get color(){
    return schemeCategory10[this.args.i];
  }

  get scaledArrivalYear(){
    let year = 1810;
    if (this.args.person.birthYear > 1817) {
      year = this.args.person.birthYear;
    }

    return this.args.yearScale(year)
    // return this.args.yearScale(this.args.person.birthYear)
  }

}
