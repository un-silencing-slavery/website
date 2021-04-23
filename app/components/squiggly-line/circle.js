import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class SquigglyLineCircleComponent extends Component {
  @action innerCircleHandleClick() {
    console.log("inner circle click handled");
  }

}
