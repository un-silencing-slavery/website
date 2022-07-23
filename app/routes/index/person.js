import Route from "@ember/routing/route";
import { service } from "@ember/service";

export default class IndexPersonRoute extends Route {
  @service activePerson;

  @service data;

  model({ person_id }) {
    this.activePerson.setActivePerson(person_id);
    return this.data.people.filter(
      (person) => person.personId === person_id
    )[0];
  }

  willTransition() {
    this.activePerson.clearActivePerson();
  }
}
