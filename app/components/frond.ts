import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import SvgService from "rose-hall/services/svg";
import { service } from "@ember/service";

export default class FrondComponent extends Component {
  @service declare svg: SvgService;

  @action pathResize() {
    console.log(this.svg.width);
  }

  pointAtLength(segmentPct: number) {
    if (this.svg.frond) {
      return this.svg.frond.getPointAtLength(
        segmentPct * this.svg.frond.getTotalLength()
      );
    }

    return { x: 0, y: 0 };
  }

  @tracked declare stem: SVGPathElement;

  get leaves() {
    if (this.svg.frond) {
      return [1, 2, 3].map((i) => this.pointAtLength(i * 0.25));
    }

    return [
      { x: 200, y: 200 },
      { x: 300, y: 300 },
      { x: 400, y: 400 },
    ];
  }
}
