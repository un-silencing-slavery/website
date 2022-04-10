import Modifier from "ember-modifier";
import { service } from "@ember/service";
import { path, curveCatmullRom } from "d3";

export default class BuildFrondModifier extends Modifier {
  @service svg;

  path(width) {
    const d = path();
    const curve = curveCatmullRom(d);
    const line = [
      [0.1 * width, 0.5 * this.svg.height],
      [0.9 * width, 0.5 * this.svg.height],
    ];
    curve.lineStart();
    for (const [x, y] of line) curve.point(x, y);
    curve.lineEnd();

    return d;
  }

  modify(element, positional) {
    const width = this.svg.width;
    let [stem, leaves] = positional;
    console.log("width", width);
    const path = element.firstElementChild;
    console.log(path);
    path.setAttribute("d", this.path(width));
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
