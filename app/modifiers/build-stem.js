import Modifier from "ember-modifier";
import { service } from "@ember/service";
import { path, curveBasis, randomNormal, randomInt } from "d3";

export default class BuildStemModifier extends Modifier {
  @service svg;

  modify(element, [setStemAndLeaves]) {
    element.setAttribute("d", this.path());
    setStemAndLeaves(element);
  }

  path() {
    const d = path();
    const curve = curveBasis(d);
    const line = [[0.1 * this.svg.width, 0.5 * this.svg.height]];
    const numberOfControls = randomInt(3, 5)();
    for (let i = 1; i < numberOfControls; i += 1) {
      const xFactor = (i / numberOfControls) * 0.6 * this.svg.width;
      const xJitter = randomNormal()() * 0.05 * this.svg.width;
      const x = xFactor + 0.1 * this.svg.width + xJitter;
      const yFactor = randomNormal(0, 0.125)();
      let y = (0.5 - yFactor) * this.svg.height;
      if (i % 2 === 1) {
        y = (0.5 + yFactor) * this.svg.height;
      }
      line.push([x, y]);
    }
    line.push([0.9 * this.svg.width, 0.5 * this.svg.height]);
    curve.lineStart();
    for (const [x, y] of line) curve.point(x, y);
    curve.lineEnd();

    return d;
  }
}
