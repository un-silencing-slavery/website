import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import SvgService from "rose-hall/services/svg";
import { service } from "@ember/service";

export default class FrondComponent extends Component {
  @service declare svg: SvgService;

  pointAtLength(segmentPct: number) {
    if (this.stem) {
      return this.stem.getPointAtLength(
        segmentPct * this.stem.getTotalLength()
      );
    }

    return { x: 0, y: 0 };
  }

  @tracked declare stem: SVGPathElement;

  get leaves() {
    if (this.stem) {
      return [1, 2, 3].map((i) => this.pointAtLength(i * 0.25));
    }

    return [
      { x: 200, y: 200 },
      { x: 300, y: 300 },
      { x: 400, y: 400 },
    ];
  }
}
