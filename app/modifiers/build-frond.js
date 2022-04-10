import Modifier from "ember-modifier";
import { service } from "@ember/service";
import { path, curveBasis, randomNormal, randomInt } from "d3";

export default class BuildFrondModifier extends Modifier {
  @service svg;

  path(width) {
    const d = path();
    const curve = curveBasis(d);
    const line = [[0.1 * width, 0.5 * this.svg.height]];
    const numberOfControls = randomInt(2, 5)();
    console.log(
      `width: ${width}, height: ${this.svg.height}, number of controls: ${numberOfControls}`
    );
    for (let i = 1; i < numberOfControls; i += 1) {
      const xFactor = (i / numberOfControls) * 0.6 * width;
      const xJitter = randomNormal()() * 0.05 * width;
      const x = xFactor + 0.1 * width + xJitter;

      let y = 0.4 * this.svg.height;
      if (i % 2 === 1) {
        y = 0.6 * this.svg.height;
      }
      line.push([x, y]);
    }
    line.push([0.9 * width, 0.5 * this.svg.height]);
    console.log(line);
    curve.lineStart();
    for (const [x, y] of line) curve.point(x, y);
    curve.lineEnd();
    return d;
  }

  modify(element, positional) {
    const width = this.svg.width;
    let [stem, leaves] = positional;
    const path = element.firstElementChild;
    path.setAttribute("d", this.path(width));
    this.svg.frond = path;
    // this.svg.frondLength = path.getTotalLength();
    // this.svg.frondCalc = path.getPointAtLength;
    leaves = [1, 2, 3].map((i) => ({
      x: i * 0.25 * this.svg.width,
      y: i * 0.25 * this.svg.height,
    }));
  }

  // constructor(owner, args) {
  //   super(owner, args);
  //   registerDestructor(this, cleanup);
  // }
}
