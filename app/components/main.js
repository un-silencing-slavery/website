import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import ModalsIndexComponent from "un-silencing-slavery-at-rose-hall/components/modals-index";

export default class MainComponent extends Component {
  @service modals;

  @action showModal() {
    this.modals.open(ModalsIndexComponent);
  }
}
