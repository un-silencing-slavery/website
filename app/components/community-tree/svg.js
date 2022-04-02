import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import { scaleLinear } from "d3-scale";
import { interpolateCool } from "d3-scale-chromatic";

export default class CommunityTreeSvgComponent extends Component {
  @service activePerson;

  personIdsArray = this.args.data.mapBy("id");

  margins = {
    top: this.args.height / 10,
    left: this.args.width / 10,
    bottom: this.args.height / 10,
    right: this.args.width / 10,
  };

  get circleRadius() {
    if (this.orientation === "portrait") {
      return 0.5 * (this.args.width - this.margins.left - this.margins.right);
    }

    return 0.375 * (this.args.height - this.margins.top - this.margins.bottom);
  }

  dataLength = this.args.data.length;

  get orientation() {
    if (this.args.width > this.args.height) {
      return "landscape";
    }

    return "portrait";
  }

  get maxAge() {
    return Math.floor(
      this.args.data
        .map((person) => person.exitYear - person.birthYear)
        .sort((a, b) => b - a)[0]
    );
  }

  get colorScale() {
    return scaleLinear().domain([0, this.maxAge]).range([0, 1]);
  }

  maxYear = 1834;

  minYear = 1813;

  gradientStop(year) {
    return (100 * (year - this.minYear)) / (this.maxYear - this.minYear);
  }

  get gradient1817() {
    return this.gradientStop(1817);
  }

  get gradient1832() {
    return this.gradientStop(1832);
  }

  get yearScale() {
    return scaleLinear()
      .domain([this.minYear, this.maxYear])
      .range([0, this.circleRadius]);
  }

  @action selectPerson(direction) {
    if (this.activePerson.personId) {
      const index = this.personIdsArray.indexOf(this.activePerson.personId);
      let newIndex = 0;
      if (direction === "forward") {
        if (index !== this.personIdsArray.length - 1) {
          newIndex = index + 1;
        }
        this.activePerson.personId = this.personIdsArray[newIndex];
      } else {
        if (index === 0) {
          newIndex = this.personIdsArray.length - 1;
        } else {
          newIndex = index - 1;
        }
        this.activePerson.personId = this.personIdsArray[newIndex];
      }
    } else {
      this.activePerson.personId = this.personIdsArray[0];
    }
  }
}