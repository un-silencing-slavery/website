import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

// squiggly-line-group

export default class SquigglyLineComponent extends Component {
  @action gHandleClick() {
    console.log("g click handled");
  }
  @action circleHandleClick() {
    console.log("circle click handled");
  }
}
