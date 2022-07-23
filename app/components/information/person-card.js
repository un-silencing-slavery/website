import Component from "@glimmer/component";
import { service } from "@ember/service";
import { action } from "@ember/object";

export default class InformationPersonCardComponent extends Component {
  @service router;

  @service activePerson;

  @action goBack() {
    this.activePerson.clearActivePerson();
    this.router.transitionTo("index");
  }
}
