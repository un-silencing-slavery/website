import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import SvgService from "rose-hall/services/svg";
import { service } from "@ember/service";
import { action } from "@ember/object";
import {
  path,
  curveCatmullRom,
  curveCatmullRomClosed,
  randomNormal,
  interpolateYlGn,
  hsl,
} from "d3";

export default class FrondComponent extends Component {
  @service declare svg: SvgService;

  @tracked declare stem: SVGPathElement;

  @tracked declare leafs: { d: any; stemD: any; transform: string }[];

  @action setStemAndLeaves(stem: SVGPathElement) {
    this.stem = stem;
    this.leafs = this.buildLeaves();
  }

  get color() {
    // const green = "#BAD4c0";
    // const green = "#BDD6C9";
    const green = hsl(interpolateYlGn(randomNormal(0.5, 0.3)()));
    green.s -= 0.25;
    return green.brighter(randomNormal(1.15, 0.04)()).formatHex();
    // return green.formatHex();
  }

  get transform() {
    const scaleFactor = randomNormal(2.5, 0.5)();
    return `translate(${randomNormal(0.5, 0.28)() * this.svg.width}, ${
      scaleFactor * 0.75 * this.svg.height
    })
      scale(${scaleFactor})`;
  }

  pointAtLength(segmentPct: number) {
    return this.stem.getPointAtLength(segmentPct * this.stem.getTotalLength());
  }

  buildLeaves() {
    const leafStems = Math.floor(randomNormal(8, 1)());
    const leafs = [];
    for (let i = 2; i <= leafStems; i += 1) {
      for (let j = 1; j <= 2; j += 1) {
        const even = j === 2;
        const segmentPct = i / (leafStems + 1);
        const { stemD, end, start } = this.buildLeafStem(segmentPct, even);
        const d = this.buildLeaf(end);
        const stemAngle = 20; //randomNormal(10, 2)();
        let rotation = this.tangentTransform(i / (leafStems + 1)) + stemAngle;
        if (even) rotation = rotation - 2 * stemAngle;
        let leafRotation = stemAngle + 10;
        if (even) leafRotation = 90 + leafRotation * 2;
        leafs.push({
          d,
          stemD,
          leafRotation: `rotate(${leafRotation}, ${end[0]}, ${end[1]})`,
          transform: `rotate(${rotation}, ${start.x}, ${start.y})`,
        });
      }
    }

    const stemTip = this.pointAtLength(0.98);
    leafs.push({
      d: this.buildLeaf([stemTip.x, stemTip.y]),
      stemD: "",
      transform: `rotate(${this.tangentTransform(0.98) + 90}, ${stemTip.x}, ${
        stemTip.y
      })`,
    });

    return leafs;
  }

  buildLeafStem(segmentPct: number, even: boolean) {
    const stemLength = randomNormal(0.035 * this.svg.height, 0.007)();
    const stemD = path();
    const curve = curveCatmullRom(stemD);
    const start = this.pointAtLength(segmentPct);
    const end: [number, number] = [start.x - stemLength, start.y];
    if (even) end[0] = start.x + stemLength;
    curve.lineStart();
    curve.point(start.x, start.y);
    if (even) {
      curve.point(
        start.x + randomNormal(0.5, 0.1)() * stemLength,
        start.y + randomNormal(0.12, 0.03)() * stemLength
      );
    } else {
      curve.point(
        start.x - randomNormal(0.5, 0.1)() * stemLength,
        start.y + randomNormal(0.12, 0.03)() * stemLength
      );
    }
    curve.point(1.2 * end[0], end[1]);
    curve.lineEnd();
    return { stemD, end, start };
  }

  buildLeaf([x, y]: [number, number]) {
    const d = path();
    const curve = curveCatmullRomClosed(d);
    const line = [[x, y]];
    const height = randomNormal(0.18, 0.015)() * this.svg.height;
    const widthFactor = 0.15;
    const bulgePoint = 0.25;
    const tipFactor = 0.03;
    const tipPoint = 0.88;
    line.push([
      x - randomNormal(bulgePoint, 0.05)() * height,
      y + randomNormal(widthFactor, 0.02)() * height,
    ]);
    line.push([
      x - randomNormal(tipPoint, 0.04)() * height,
      y + randomNormal(tipFactor, 0.01)() * height,
    ]);
    line.push([x - height, y]);
    line.push([
      x - randomNormal(tipPoint, 0.04)() * height,
      y - randomNormal(tipFactor, 0.01)() * height,
    ]);
    line.push([
      x - randomNormal(bulgePoint, 0.05)() * height,
      y - randomNormal(widthFactor, 0.02)() * height,
    ]);
    curve.lineStart();
    for (const [n, m] of line) curve.point(n, m);
    curve.lineEnd();
    return d;
  }

  tangentTransform(segmentPct: number) {
    const pointA = this.pointAtLength(segmentPct);
    const pointB = this.pointAtLength(1.001 * segmentPct);
    const slope = (pointB.y - pointA.y) / (pointB.x - pointA.x);
    let theta = (Math.atan(slope) * 180) / Math.PI + 90;
    if (theta > 90) return theta - 180;
    return theta;
  }
}
