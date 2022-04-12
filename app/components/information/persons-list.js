import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import move from "ember-animated/motions/move";

export default class InformationPersonsListComponent extends Component {
  @service activePerson;

  @service data;

  get personData() {
    const people = this.data.sortedData();
    if (this.activePerson.personId) {
      const personIdsArray = this.data.sortedData().mapBy("personId");
      const data = [];
      const activeIndex = personIdsArray.indexOf(this.activePerson.personId);
      data.push(people[activeIndex]);
      if (activeIndex > 0) {
        for (const person of people.slice(0, activeIndex)) {
          data.push(person);
        }
      }
      if (activeIndex < people.length - 1) {
        for (const person of people.slice(activeIndex + 1, people.length - 1)) {
          data.push(person);
        }
      }

      return data;
    }

    return people;
  }
}
