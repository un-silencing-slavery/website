import Component from '@glimmer/component';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { scaleLinear } from "d3-scale";
import { interpolateCool } from "d3-scale-chromatic";

export default class CommunityTreeComponent extends Component {

  width = 400;

  height = 400;

  dataLength = this.args.data.length;


  get colorScale() {
    return scaleLinear()
      .domain([0,15])
      .range([0,1]);
  }

  get yearScale() {
    return scaleLinear()
      .domain([1810, 1832])
      .range([0, this.height / 2]);
  }

}
