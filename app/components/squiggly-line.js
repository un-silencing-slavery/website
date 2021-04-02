import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { select } from "d3-selection";

// squiggly-line-group

export default class SquigglyLineComponent extends Component {

  @tracked firstPoint = { x: 0, y: 0 };

  @tracked secondPoint = { x: 0, y: 0 };

  segments = 3;

  offset = .025;

  centripetal = false;

  controlPoint = function([m, n], perpendicularSlope, index) {
    let offset = this.offset * this.args.length
    const midpoint = {
      x: (m.x + n.x) / 2,
      y: (m.y + n.y) / 2
    }
    // select(".squiggly-line-group")
    //   .append("circle")
    //     .attr("cx", midpoint.x)
    //     .attr("cy", midpoint.y * -1)
    //     .attr("r", 2);
    if (this.centripetal) {
      if (index % 2 == 0) {
        offset = -1 * offset;
      }
    } else {
      if (index % 2 == 1) {
        offset = -1 * offset;
      }
    }

    let theta = Math.atan(perpendicularSlope)
    const controlPoint = {
      x: (Math.cos(theta) * offset) + midpoint.x,
      y: (Math.sin(theta) * offset) + midpoint.y };

    console.log(`cos: ${Math.cos(theta)}, sin: ${Math.sin(theta)},
      midpoint: ${midpoint.x}, ${midpoint.y}
      controlPoint: ${controlPoint.x}, ${controlPoint.y}`)

    // select(".squiggly-line-group")
    //   .append("circle")
    //   .attr("cx", controlPoint.x)
    //   .attr("cy", -controlPoint.y)
    //   .attr("r", 2)
    //   .attr("fill", "pink");

    // select(".squiggly-line-group")
    //   .append("path")
    //   .attr("d", `M ${m.x}, -${m.y} 
    //   L ${controlPoint.x}, ${-controlPoint.y} 
    //   L ${n.x}, -${n.y}
    //   `)
    //   .attr("fill", "none")
    //   .attr("stroke", "orange")

    return controlPoint;
  }

  waveSegment([m, n], perpendicularSlope, index){

    const controlPoint = this.controlPoint([m, n], perpendicularSlope, index);
    return `Q ${controlPoint.x}, ${-controlPoint.y} ${n.x}, -${n.y} `;
  }

  waves([m, n], centripetal = false) {
    this.centripetal = centripetal;
    const numberOfSegments = 3;
    const slope = (n.y - m.y) / (n.x - m.x)
    const perpendicularSlope = -1 / slope;
    const segmentPoints = [m]
    if(this.centripetal){
      for (let i = numberOfSegments; i > 0; i -= 1) {
        segmentPoints.push({
          x: (Math.pow(2, i) - 1)/(Math.pow(2, i)) * (m.x + n.x),
          y: (Math.pow(2, i) - 1)/(Math.pow(2, i)) * (m.y + n.y),
        });
      }
    } else {
      for (let i = 1; i <= numberOfSegments; i += 1) {
        segmentPoints.push({
          x: (Math.pow(2, i) - 1)/(Math.pow(2, i)) * (m.x + n.x),
          y: (Math.pow(2, i) - 1)/(Math.pow(2, i)) * (m.y + n.y),
        });
      }
    }

    segmentPoints.push(n);
    let path = "";
    for (let i = 0; i < segmentPoints.length - 1; i += 1) {
    //   console.log(segmentPoints[i], segmentPoints[i +1]);
      path = path + this.waveSegment([segmentPoints[i], segmentPoints[i + 1]], perpendicularSlope, i)
    }
    return path;
  }

  get path() {
    const firstPoint = { x: 0, y: this.args.length };
    const theta = 2 * Math.PI/this.args.wedgeCount;
    const secondPoint = {
      x: Math.sin(theta) * this.args.length,
      y: Math.cos(theta) * this.args.length
    };
    this.firstPoint = firstPoint;
    this.secondPoint = secondPoint;
      

    return `M0, 0
      ${this.waves([{x: 0, y:0}, firstPoint])}
      L ${secondPoint.x}, -${secondPoint.y}
      ${this.waves([secondPoint, {x: 0, y:0}], true)}
      Z
    `;

  }

}
