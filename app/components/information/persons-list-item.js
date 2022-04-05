import Component from "@glimmer/component";
import { service } from "@ember/service";
import { action } from "@ember/object";

export default class InformationPersonsListItemComponent extends Component {
  @service activePerson;

  get active() {
    return this.activePerson.personId === this.args.person.personId;
  }

  @action
  setActivePerson() {
    this.activePerson.personId = this.args.person.personId;
  }
}
