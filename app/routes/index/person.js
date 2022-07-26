import Route from "@ember/routing/route";
import { service } from "@ember/service";

export default class IndexPersonRoute extends Route {
  @service activePerson;

  @service data;

  afterModel(model) {
    super.afterModel(...arguments);

    this.metaInfo = {
      title: `${model.name} | People | (Un)Silencing Slavery`,
    };
  }

  model({ person_slug }) {
    const person = this.data.people.filter(
      (person) => person.personSlug === person_slug
    )[0];
    this.activePerson.setActivePerson(person.personId);
    return person;
  }

  willTransition() {
    this.activePerson.clearActivePerson();
  }
}
