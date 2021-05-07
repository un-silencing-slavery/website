import Component from '@glimmer/component';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import { scaleLinear } from "d3-scale";
import { interpolateCool } from "d3-scale-chromatic";

export default class CommunityTreeComponent extends Component {

  @service activePerson;

  personIdsArray = this.args.data.mapBy("id");

  width = .65 * document.getElementById("visualization").offsetWidth;

  height = .65 * document.getElementById("visualization").offsetWidth;

  // height = 400;

  dataLength = this.args.data.length;


  get colorScale() {
    return scaleLinear()
      .domain([0,15])
      .range([0,1]);
  }

  get yearScale() {
    return scaleLinear()
      .domain([1810, 1832])
      .range([0, this.height / 2.1]);
  }

  @action selectPerson(direction) {
    if(this.activePerson.personId) {
      const index = this.personIdsArray.indexOf(this.activePerson.personId);
      let newIndex = 0;
      if(direction === "forward") {
        if(index !== this.personIdsArray.length - 1){
          newIndex = index + 1;
        }
        this.activePerson.personId = this.personIdsArray[newIndex];
      } else {
        if(index === 0){
          newIndex = this.personIdsArray.length - 1;
        } else {
          newIndex = index - 1;
        }
        this.activePerson.personId = this.personIdsArray[newIndex];
      }
    } else {
      this.activePerson.personId = this.personIdsArray[0];
    }
    console.log(this.activePerson.personId);
  }


}
