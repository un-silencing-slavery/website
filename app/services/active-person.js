import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ActivePersonService extends Service {
  @tracked personId = null;

  @action setActivePerson(personId) {
    this.personId = personId;
  }

  @action clearActivePerson() {
    this.personId = null;
  }
}
