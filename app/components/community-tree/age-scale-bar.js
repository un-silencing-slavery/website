import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";

export default class CommunityTreeAgeScaleBarComponent extends Component {
  @service svg;

  tickLength = 10;

  get barLong() {
    if (this.svg.isLandscape) {
      return 0.6 * this.svg.height;
    }

    return 0.8 * this.svg.width;
  }

  barShort = 20;

  tickOffset = 4;

  get settings() {
    console.log("is landscape", this.svg.isLandscape);
    const settings = {
      width: this.barLong,
      height: this.barShort,
      textAnchor: "middle",
      transform: `translate(${0.1 * this.svg.width}, ${this.svg.height - 100})`,
      axisTransform: `translate(0, ${this.barShort})`,
      axisX1: 0,
      axisX2: this.barLong,
      axisY1: this.tickOffset,
      axisY2: this.tickOffset,
    };

    if (this.svg.isLandscape) {
      settings.width = this.barShort;
      settings.height = this.barLong;
      settings.transform = `translate(${this.svg.width - 100}, ${
        0.2 * this.svg.height
      })`;
      settings.textAnchor = "left";
      settings.axisTransform = `translate(${this.barShort}, 0)`;
      settings.axisX1 = this.tickOffset;
      settings.axisX2 = this.tickOffset;
      settings.axisY1 = 0;
      settings.axisY1 = this.barLong;
    }

    console.log(settings);

    return settings;
  }

  @action axisTicksTransform(age) {
    if (this.svg.isLandscape) {
      return `translate(0, ${(age * this.barLong) / 80})`;
    }

    return `translate(${(age * this.barLong) / 80}, 0)`;
  }
}
