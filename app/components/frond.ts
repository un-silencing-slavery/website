import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import SvgService from "rose-hall/services/svg";
import { path, curveCatmullRom } from "d3";
import { service } from "@ember/service";

export default class FrondComponent extends Component {
  @service declare svg: SvgService;

  @tracked stem: SVGPathElement | null = null;

  @action setStem(path: SVGPathElement) {
    this.stem = path;
    // this.dots = [1, 2, 3].map((i) => {
    //   return path.getPointAtLength(i * 0.25 * path.getTotalLength());
    // });
  }

  get path() {
    const d = path();
    const curve = curveCatmullRom(d);
    const line = [
      [0.1 * this.svg.width, 0.5 * this.svg.height],
      [0.9 * this.svg.width, 0.5 * this.svg.height],
    ];
    curve.lineStart();
    for (const [x, y] of line) curve.point(x, y);
    curve.lineEnd();

    return d;
  }

  get dots() {
    console.log("in get dots");
    if (this.stem instanceof SVGPathElement) {
      return [
        this.stem.getPointAtLength(this.stem.getTotalLength() / 4),
        this.stem.getPointAtLength(this.stem.getTotalLength() / 2),
        this.stem.getPointAtLength(this.stem.getTotalLength() / 1.333),
      ];
    }

    return [];
  }

  // @tracked declare dots: SVGPoint[];
}
