import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
// import { action } from "@ember/object";
import SvgService from "rose-hall/services/svg";
import { service } from "@ember/service";

export default class FrondComponent extends Component {
  @service declare svg: SvgService;

  @tracked declare stem: SVGPathElement;

  // get dots() {
  //   return [
  //     { x: 200, y: 200 },
  //     { x: 300, y: 300 },
  //     { x: 400, y: 400 },
  //   ];
  // }

  @tracked declare leaves: SVGPoint[];
}
