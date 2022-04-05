import Route from "@ember/routing/route";
import { service } from "@ember/service";

export default class IndexPersonRoute extends Route {
  @service activePerson;

  model({ person_id }) {
    this.activePerson.setActivePerson(person_id);
  }
}
