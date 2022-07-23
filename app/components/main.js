import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import ModalsIndexComponent from "un-silencing-slavery/components/modals-index";

export default class MainComponent extends Component {
  @service modalIndex;

  @service modals;

  @service data;

  @action showModal() {
    if (this.modalIndex.showModal) {
      this.modalIndex.showModal = false;
      this.modals.open(ModalsIndexComponent);
    }
  }
}
