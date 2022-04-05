import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { scaleLinear } from "d3-scale";

export default class CommunityTreeSvgComponent extends Component {
  @service svg;

  @service activePerson;

  personIdsArray = this.args.people.mapBy("id");

  dataLength = this.args.people.length;

  get maxAge() {
    return Math.floor(
      this.args.people
        .map((person) => person.exitYear - person.birthYear)
        .sort((a, b) => b - a)[0]
    );
  }

  get colorScale() {
    return scaleLinear().domain([0, this.maxAge]).range([0, 1]);
  }

  get ageScale() {
    return scaleLinear()
      .domain([0, this.maxAge])
      .range([0, this.svg.ageScaleBarWidth]);
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
      .range([0, this.svg.circleRadius]);
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
