import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import type Modals from "ember-promise-modals";
import ModalsIndexComponent from "un-silencing-slavery-at-rose-hall/components/modals-index";

export default class MainComponent extends Component {
  @service declare modals: Modals;

  @action showModal() {
    this.modals.open(ModalsIndexComponent);
  }
}
