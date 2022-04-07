import Component from "@glimmer/component";
import { service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class InformationPersonsListItemComponent extends Component {
  @service activePerson;

  @service data;

  get familyIndent() {
    let indent = { class: "", text: "" };
    if (this.data.sortKey !== "family") {
      this.isMother = false;
      return "";
    }

    const children = this.data.people.filter(
      (person) => person.motherId === this.args.person.personId
    );
    if (children.length > 0) {
      this.isMother = true;
    }

    if (this.args.person.motherId) {
      const mother = this.data.people.filter(
        (person) => person.personId === this.args.person.motherId
      )[0];
      indent.text = "└ ";
      indent.class = "pl-1";
      if (mother.motherId) {
        const grandmothers = this.data.people.filter(
          (person) => person.personId === mother.motherId
        );
        indent.class = "pl-3";

        if (grandmothers.length > 0) {
          const grandmother = grandmothers[0];
          const greatgrandmothers = this.data.people.filter(
            (person) => person.personId === grandmother.motherId
          );
          if (greatgrandmothers.length > 0) {
            indent.class = "pl-5";
          }
        }
      }
    }

    return indent;
  }

  @tracked isMother = false;

  get active() {
    return this.activePerson.personId === this.args.person.personId;
  }

  @action
  setActivePerson() {
    this.activePerson.personId = this.args.person.personId;
  }
}
