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
    yield;
  }

  get data() {
    const model = this.args.model.toArray();
    if (this.activePerson.personId) {
      const personIdsArray = this.args.model.mapBy("id");
      const data = [];
      const activeIndex = personIdsArray.indexOf(this.activePerson.personId);
      data.push(model[activeIndex]);
      if (activeIndex > 0) {
        for (const person of model.slice(0, activeIndex)) {
          data.push(person);
        }
      }
      if (activeIndex < model.length - 1) {
        for (const person of model.slice(activeIndex + 1, model.length - 1)) {
          data.push(person);
        }
      }

      return data;
    }

    return model;
  }
}
