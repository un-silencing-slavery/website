import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import ModalsIndexComponent from "un-silencing-slavery/components/modals-index";
import config from "un-silencing-slavery/config/environment";

export default class MainComponent extends Component {
  @service modalIndex;

  @service modals;

  @service data;

  @action showModal() {
    if (this.modalIndex.showModal && config.environment === "production") {
      this.modalIndex.showModal = false;
      this.modals.open(ModalsIndexComponent);
    }
  }
}
