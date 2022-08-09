import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";

export default class CommunityTreeAgeScaleBarComponent extends Component {
  @service svg;

  get barLong() {
    if (this.svg.isLandscape) {
      return 0.6 * this.svg.height;
    }

    return 0.8 * this.svg.width;
  }

  get barShort() {
    return 1 * this.svg.rem;
  }

  get tickOffset() {
    return this.svg.rem / 4;
  }

  get tickLength() {
    return 0.5 * this.svg.rem;
  }

  get settings() {
    let height = this.svg.spacerHeight || this.svg.height;
    const settings = {
      width: this.barLong,
      height: this.barShort,
      textAnchor: "middle",
      transform: `translate(${0.1 * this.svg.width}, ${
        height - 5 * this.svg.rem
      })`,
      axisTransform: `translate(0, ${this.barShort})`,
      axisX1: 0,
      axisX2: this.barLong,
      axisY1: this.tickOffset,
      axisY2: this.tickOffset,
      textTitleTransform: `translate(${this.barLong / 2}, ${
        2.75 * this.svg.rem
      })`,
      tickX1: 0,
      tickX2: 0,
      tickY1: this.tickOffset,
      tickY2: this.tickLength + this.tickOffset,
      tickTextTransform: `translate(0, ${1.5 * this.svg.rem})`,
    };

    if (this.svg.isLandscape) {
      settings.width = this.barShort;
      settings.height = this.barLong;
      settings.transform = `translate(${this.svg.width - 5 * this.svg.rem}, ${
        0.2 * this.svg.height
      })`;
      settings.textAnchor = "left";
      settings.textTitleTransform = `translate(${
        2 * this.tickOffset + this.tickLength
      }, -${this.svg.rem})`;
      settings.axisTransform = `translate(${this.barShort}, 0)`;
      settings.axisX1 = this.tickOffset;
      settings.axisX2 = this.tickOffset;
      settings.axisY1 = 0;
      settings.axisY2 = this.barLong;
      settings.tickX1 = this.tickOffset;
      settings.tickX2 = this.tickOffset + this.tickLength;
      settings.tickY1 = 0;
      settings.tickY2 = 0;
      settings.tickTextTransform = `translate(${
        2 * this.tickOffset + this.tickLength
      }, ${0.35 * this.svg.rem})`;
    }

    if (this.svg.isLandscape && this.svg.width < 768) {
      settings.width = 0.75 * this.barShort;
      settings.transform = `translate(${
        this.svg.width - 3.25 * this.svg.rem
      }, ${0.2 * this.svg.height})`;
      settings.axisX1 = 0.25 * this.tickOffset;
      settings.axisX2 = 0.25 * this.tickOffset;
      settings.tickX1 = 0.25 * this.tickOffset;
      settings.tickX2 = 0.25 * this.tickOffset + this.tickLength;
      settings.tickTextTransform = `translate(${
        this.tickOffset + this.tickLength
      }, ${0.35 * this.svg.rem})`;
      settings.textTitleTransform = `translate(${
        this.tickOffset + this.tickLength
      }, -${this.svg.rem})`;
    }

    return settings;
  }

  @action axisTicksTransform(age) {
    if (this.svg.isLandscape) {
      return `translate(0, ${(age * this.barLong) / 80})`;
    }

    return `translate(${(age * this.barLong) / 80}, 0)`;
  }
}
