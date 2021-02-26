import Component from '@glimmer/component';
import { arc } from "d3-shape";
import { interpolateCool } from "d3-scale-chromatic";

export default class CommunityTreePersonComponent extends Component {
  age = this.args.person.exitYear - this.args.person.birthYear;

  get rotationAngle(){
    return this.args.i * 360 / this.args.dataLength;
  }

  get arc(){
    /*
    return arc()
    .innerRadius(this.scaledArrivalYear)
    .outerRadius(this.args.yearScale(this.args.person.exitYear))
    .padAngle(Math.PI / 360)
    .startAngle(0)
    .endAngle(2 * Math.PI / 10)();
    // .endAngle(2 * Math.PI / this.args.dataLength)();
    */
    // return `
    //   M 0, -200
    //   L 116.8, -162
    //   L 0, 0
    //   Z
    //   `;

//       M 0.8726618569493164, -200
//       A 200,
//       200,
//       0,
//       0,
//       1,
//       116.8499331274869,
//       -162.31479639300244
//       L 0, 0
//       Z`;
    return this.buildPetal();
  }

  buildPetal() {
    let top = this.args.yearScale(this.args.person.exitYear);

    let d = "";
    // 1. know how tall to draw the wedge
    d = `M 0, -${top}`;
    // 2. know where to draw the end of the wedge
    // what is the angle width of the wedge?
    const wedgeWidth = Math.PI / 5;
    // (2 * Math.PI / this.args.dataLength)
    // 2pi / number of people
    const angle = (Math.PI / 2) - wedgeWidth;
    const x = Math.sin(wedgeWidth) * top;
    const y = Math.cos(wedgeWidth) * top;


    d = d + `L ${x}, -${y} `;
    // 3. return to center
    // Let's draw one line and make it curvy. this is too complicated with the fact that this line is returning to the center on an angle. It's too hard to tell if we're doing the right thing.
    // This is a point midway down the line.
    const midX = x/2;
    const midY = y/2;
    // This is the distance we want our perpendicular bisector to be from the line
    const controlLength = 100;
    // This is the hypoteneuse of the triangle going from the perpendicular bisector's endpoint to the center of the circle
    const controlHypo = Math.sqrt(controlLength * controlLength + ((top/2) * (top/2)));
    // This is the angle of the mini right triangle made up of half of the wedge length and the perpendicular bisector
    const miniTheta = Math.atan(controlLength/top);
    // This is the angle of the remaining angle to get the x and y values of the bisector endpoint.
    const lastTheta = Math.PI/2 - top - miniTheta;
    // Solving for the bisector endpoint.
    const lastx = Math.sin(lastTheta) * controlHypo;
    const lasty = Math.cos(wedgeWidth) * controlHypo;

    //
    d = d + `Q ${lastx}, -${lasty} ,  0, 0`;
    // 4. close shape
    d = d + "Z";

    return d;
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
