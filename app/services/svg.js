import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class SvgService extends Service {
  @tracked width = 200;

  @tracked height = 200;

  margins = {
    top: this.height / 10,
    left: this.width / 10,
    bottom: this.height / 10,
    right: this.width / 10,
  };

  get circleRadius() {
    if (this.height > this.width) {
      return 0.5 * (this.width - this.margins.left - this.margins.right);
    }

    return 0.375 * (this.height - this.margins.top - this.margins.bottom);
  }
}
