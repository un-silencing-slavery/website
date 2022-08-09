import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import { scaleLinear } from "d3";

export default class CommunityTreeIndex extends Component {
  @service svg;

  @service data;

  @service activePerson;

  @action calculateSvgSizes({ contentRect }) {
    const informationHeight =
      document.getElementById("information")?.clientHeight;
    const visualizationHeight =
      document.getElementById("visualization")?.clientHeight;
    const visualizationWidth =
      document.getElementById("visualization")?.clientWidth;

    let width = visualizationWidth;
    let height = 0; //informationHeight ?? visualizationHeight;

    if (contentRect) {
      width = Math.ceil(contentRect.width);
      if (contentRect.height > height) {
        height = contentRect.height;
      }
    }

    this.svg.width = width;
    this.svg.height = height;
  }

  personIdsArray = this.data.people.mapBy("id");

  dataLength = this.data.people.length;

  get maxAge() {
    return this.data.maxAge;
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
