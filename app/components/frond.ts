import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import SvgService from "rose-hall/services/svg";
import { service } from "@ember/service";
import { action } from "@ember/object";
import { path, curveCatmullRomClosed, randomNormal, randomInt } from "d3";

export default class FrondComponent extends Component {
  @service declare svg: SvgService;

  pointAtLength(segmentPct: number) {
    return this.stem.getPointAtLength(segmentPct * this.stem.getTotalLength());
  }

  @action setStemAndLeaves(stem: SVGPathElement) {
    console.log("insetstem");
    this.stem = stem;
    this.leafs = this.buildLeaves();
  }

  buildLeaves() {
    console.log("in buildleaves");
    const leafStems = randomInt(2, 5)();
    const leafs = [];
    for (let i = 1; i <= leafStems; i += 1) {
      for (let j = 1; j <= 2; j += 1) {
        const d = path();
        const curve = curveCatmullRomClosed(d);
        const start = this.pointAtLength(i / (leafStems + 1));
        const line = [[start.x, start.y]];
        line.push([start.x - 50, start.y - 50]);
        line.push([start.x - 4, start.y - 190]);
        line.push([start.x, start.y - 200]);
        line.push([start.x + 4, start.y - 190]);
        line.push([start.x + 50, start.y - 50]);
        curve.lineStart();
        for (const [x, y] of line) curve.point(x, y);
        curve.lineEnd();

        let rotation = 20;
        if (j == 2) rotation = 180 - rotation;
        leafs.push({
          d,
          transform: `rotate(${rotation}, ${start.x}, ${start.y})`,
        });
      }
    }

    console.log(leafs);
    return leafs;
  }

  @tracked declare stem: SVGPathElement;

  @tracked declare leafs: { d: any; transform: string }[];
}
