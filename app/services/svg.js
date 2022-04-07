import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { interpolateWarm } from "d3-scale-chromatic";

export default class SvgService extends Service {
  @tracked width = 201;

  @tracked height = 200;

  get rem() {
    return parseFloat(
      window
        .getComputedStyle(document.documentElement)
        .fontSize.replace("px", ""),
      10
    );
  }

  get isLandscape() {
    return this.width > this.height;
  }

  get margins() {
    const base = 1 * this.rem;
    const margins = {
      top: base,
      left: base,
      bottom: base + 3 * this.rem,
      right: base,
    };

    if (this.isLandscape) {
      margins.bottom = base;
      margins.right = base + 3 * this.rem;
    }

    return margins;
  }

  gradient(value) {
    return interpolateWarm(-(value - 1));
  }

  get circleTransform() {
    return `translate(${
      (this.width - this.margins.right - this.margins.left) / 2 +
      this.margins.left
    }, ${
      (this.height - this.margins.top - this.margins.bottom) / 2 +
      this.margins.top
    })`;
  }

  get circleRadius() {
    if (this.isLandscape) {
      return (this.height - this.margins.top - this.margins.bottom) / 2;
    }

    return (this.width - this.margins.right - this.margins.left) / 2;
  }
}
