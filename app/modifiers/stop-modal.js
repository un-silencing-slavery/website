import Modifier from "ember-modifier";
import { service } from "@ember/service";

export default class StopModalModifier extends Modifier {
  @service modalIndex;

  modify() {
    this.modalIndex.showModal = false;
  }
}
