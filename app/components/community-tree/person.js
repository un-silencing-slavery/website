/* eslint ember/no-side-effects: "off" */
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { randomNormal, line, curveBundle } from "d3";
import { service } from "@ember/service";

export default class CommunityTreePersonComponent extends Component {
  @service router;

  @service activePerson;

  @tracked firstPoint = { x: 0, y: 0 };

  @tracked secondPoint = { x: 0, y: 0 };

  @action handleClick() {
    this.router.transitionTo("index.person", this.args.person.personSlug);
  }

  get exitYear() {
    if (this.args.person.exitYear > 1832) {
      return 1833.7;
    }

    if (!this.args.person.exitYear || this.args.person.exitYear === 0) {
      return 1833.7;
    }

    if (this.args.person.exitYear === this.args.person.arrivalYear) {
      return this.args.person.exitYear + 0.5;
    }

    return this.args.person.exitYear;
  }

  age = this.exitYear - this.args.person.birthYear;

  argsdataLength = this.args.dataLength;

  get rotationAngle() {
    return (this.args.i * 360) / this.argsdataLength;
  }

  setOffset(expression) {
    this.offset = expression;
  }

  get path() {
    const x = 0;
    const origin = {
      x,
      y: -this.scaledArrivalYear,
    };
    const firstPoint = {
      x,
      y: -this.args.yearScale(this.exitYear),
    };
    this.setOffset(0.04 * (firstPoint.y - origin.y) * -1);

    const theta = (2 * Math.PI) / this.argsdataLength;
    const secondPoint = {
      x: Math.sin(theta) * firstPoint.y * -1,
      y: Math.cos(theta) * firstPoint.y,
    };
    this.firstPoint = firstPoint;
    this.secondPoint = secondPoint;

    const outWaves = this.waves([origin, firstPoint]);
    const inWaves = this.waves([secondPoint, origin], true).replace("M", "L");

    const thePath = `${outWaves}
    ${inWaves}
      Z
    `;

    return thePath;
  }

  waves([m, n], centripetal = false) {
    this.centripetal = centripetal;
    const numberOfSegments = 3;
    const slope = (n.y - m.y) / (n.x - m.x);
    const perpendicularSlope = -1 / slope;
    const segmentPoints = [m];
    if (this.centripetal) {
      for (let i = numberOfSegments; i > 0; i -= 1) {
        segmentPoints.push({
          x: ((Math.pow(2, i) - 1) / Math.pow(2, i)) * (m.x + n.x),
          y:
            n.y +
            ((Math.pow(2, i) - 1) / Math.pow(2, i)) *
              (Math.abs(n.y) - Math.abs(m.y)),
        });
      }
    } else {
      for (let i = 1; i <= numberOfSegments; i += 1) {
        segmentPoints.push({
          x: ((Math.pow(2, i) - 1) / Math.pow(2, i)) * (m.x + n.x),
          y:
            m.y -
            ((Math.pow(2, i) - 1) / Math.pow(2, i)) *
              (Math.abs(n.y) - Math.abs(m.y)),
        });
      }
    }

    segmentPoints.push(n);

    const linePSegments = [[m.x, m.y]];

    let path = "";
    for (let i = 0; i < segmentPoints.length - 1; i += 1) {
      let newSegment = this.waveSegment(
        [segmentPoints[i], segmentPoints[i + 1]],
        perpendicularSlope,
        i
      );

      const [, controlPointX, controlPointY] = newSegment.split(" ");

      linePSegments.push([
        parseFloat(controlPointX.replace(",", "")),
        parseFloat(controlPointY),
      ]);

      path = path + newSegment;
    }

    linePSegments.push([n.x, n.y]);

    const lineP = line().curve(curveBundle)(linePSegments);

    return lineP;
  }

  waveSegment([m, n], perpendicularSlope, index) {
    const controlPoint = this.controlPoint([m, n], perpendicularSlope, index);
    return `Q ${controlPoint.x}, ${controlPoint.y} ${n.x}, ${n.y} `;
  }

  @tracked offset = 0.025;

  centripetal = false;

  controlPoint = function ([m, n], perpendicularSlope, index) {
    let offset = this.jitterOffset;
    const midpoint = {
      x: (m.x + n.x) / 2,
      y: (m.y + n.y) / 2,
    };
    if (this.centripetal) {
      if (index % 2 == 0) {
        offset = -1 * offset;
      }
    } else {
      if (index % 2 == 1) {
        offset = -1 * offset;
      }
    }

    let theta = Math.atan(perpendicularSlope);
    const controlPoint = {
      x: Math.cos(theta) * offset + midpoint.x,
      y: Math.sin(theta) * offset + midpoint.y,
    };

    return controlPoint;
  };

  get arc() {
    /*
    return arc()
    .innerRadius(this.scaledArrivalYear)
    .outerRadius(this.args.yearScale(this.exitYear))
    .padAngle(Math.PI / 360)
    .startAngle(0)
    .endAngle(2 * Math.PI / 10)();
    // .endAngle(2 * Math.PI / this.argsdataLength)();
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
    let top = this.args.yearScale(this.exitYear);

    let d = "";
    // 1. know how tall to draw the wedge
    d = `M 0, -${top}`;
    // 2. know where to draw the end of the wedge
    // what is the angle width of the wedge?
    const wedgeWidth = Math.PI / 5;
    // (2 * Math.PI / this.argsdataLength)
    // 2pi / number of people
    // const angle = Math.PI / 2 - wedgeWidth;
    const x = Math.sin(wedgeWidth) * top;
    const y = Math.cos(wedgeWidth) * top;

    d = d + `L ${x}, -${y} `;
    // 3. return to center
    // Let's draw one line and make it curvy. this is too complicated with the fact that this line is returning to the center on an angle. It's too hard to tell if we're doing the right thing.
    // This is a point midway down the line.
    // const midX = x / 2;
    // const midY = y / 2;
    // This is the distance we want our perpendicular bisector to be from the line
    const controlLength = 100;
    // This is the hypoteneuse of the triangle going from the perpendicular bisector's endpoint to the center of the circle
    const controlHypo = Math.sqrt(
      controlLength * controlLength + (top / 2) * (top / 2)
    );
    // This is the angle of the mini right triangle made up of half of the wedge length and the perpendicular bisector
    const miniTheta = Math.atan(controlLength / top);
    // This is the angle of the remaining angle to get the x and y values of the bisector endpoint.
    const lastTheta = Math.PI / 2 - top - miniTheta;
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
    return `url(#${this.args.person.personId}-gradient)`;
  }

  get scaledArrivalYear() {
    let year = this.args.minYear;
    if (this.args.person.birthYear > 1817) {
      year = this.args.person.birthYear;
    }

    return this.args.yearScale(year);
    // return this.args.yearScale(this.args.person.birthYear)
  }

  get jitterOffset() {
    return randomNormal(this.offset, 0.2 * this.offset)();
  }

  /*
  @action raisePetal(element){
  }
  */
}
