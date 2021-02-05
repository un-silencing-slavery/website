import Component from '@glimmer/component';
import { arc } from "d3-shape";
import { interpolateCool } from "d3-scale-chromatic";

export default class CommunityTreePersonComponent extends Component {
  age = this.args.person.exitYear - this.args.person.birthYear;

  get rotationAngle(){
    return this.args.i * 360 / this.args.dataLength;
  }

  get arc(){
    return arc()
    .innerRadius(this.scaledArrivalYear)
    .outerRadius(this.args.yearScale(this.args.person.exitYear))
    .padAngle(Math.PI / 360)
    .startAngle(0)
    .endAngle(2 * Math.PI / this.args.dataLength)();
  }

  get gradientUrl() {
    return `url(#${this.args.person.id}-gradient)`;
  }

  get color(){
    /* Potential color schemes:
     * 
     * Do we even need to color by these values? Are they important
     * to us? Why?
     *
     * Age.
     * Gender (2 val)
     * Origin (4 val)
     * Color (4 val)
     *
     */
    return interpolateCool(Math.random());
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
