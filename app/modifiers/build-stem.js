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
    const stemHeight = 0.7 * this.svg.height;
    const d = path();
    const curve = curveBasis(d);
    const line = [[0, 0]];
    const numberOfControls = randomInt(4, 6)();
    for (let i = 1; i < numberOfControls; i += 1) {
      let x = randomNormal(0.12, 0.04)() * stemHeight;
      const y =
        -(i / numberOfControls) * stemHeight +
        randomNormal(0, 0.02)() * stemHeight;
      if (i % 2 === 1) {
        x = -x;
      }
      line.push([x, y]);
    }
    line.push([0, -stemHeight]);
    curve.lineStart();
    for (const [x, y] of line) curve.point(x, y);
    curve.lineEnd();

    return d;
  }
}
