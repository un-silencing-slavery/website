/* eslint require-yield: "off" */
import Component from "@glimmer/component";
import { service } from "@ember/service";
import { fadeOut, fadeIn } from "ember-animated/motions/opacity";
// import { scale } from 'ember-animated/motions/scale';

export default class InformationPersonCardComponent extends Component {
  @service activePerson;

  @service data;

  get person() {
    return this.data.people.filter(
      (person) => person.personId === this.activePerson.personId
    )[0];
  }

  constructor() {
    super(...arguments);
    // if (!this.activePerson.personId) {
    //   this.activePerson.setActivePerson(this.args.personId);
    // }
  }
}
