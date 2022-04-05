/* eslint require-yield: "off" */
import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import move from "ember-animated/motions/move";

export default class PersonsListComponent extends Component {
  @service activePerson;

  @action
  *transition({ keptSprites }) {
    keptSprites.forEach((sprite) => {
      if (sprite.element.dataset.personId === this.activePerson.personId) {
        sprite.applyStyles({
          "z-index": "100",
        });
      } else {
        sprite.applyStyles({
          "z-index": "0",
        });
      }
      move(sprite);
    });
  }

  get data() {
    const people = this.args.people.toArray();
    if (this.activePerson.personId) {
      const personIdsArray = this.args.people.mapBy("personId");
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
