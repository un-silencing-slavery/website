import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";

export default class InformationPersonCardComponent extends Component {
  @service activePerson;

  @service data;

  @tracked childrenNumber = "no children. ";

  get children() {
    const children = this.data.people.filter(
      (person) => person.motherId === this.person.personId
    );
    if (children.length < 1) {
      return false;
    } else {
      const names = children.map((child) => child.name);
      if (names.length === 1) {
        this.childrenNumber = "one child, ";
        return names[0];
      } else if (names.length === 2) {
        this.childrenNumber = `a pair of children, `;
        return names.map((name) => name).join(" and ");
      } else {
        this.childrenNumber = `${names.length} children, `;
        names[names.length - 1] = `and ${names[names.length - 1]}`;
        return names.map((name) => name.trim()).join(", ");
      }
    }
  }

  get mother() {
    const mother = this.person.motherId;
    if (mother) {
      return this.data.people.filter((person) => person.personId === mother)[0]
        .name;
    }

    return false;
  }

  get color() {
    return this.person.color || false;
  }

  get origin() {
    return this.person.country || false;
  }

  get birthYear() {
    return this.person.birthYear || false;
  }

  get exitYear() {
    return this.person.exitYear || false;
  }

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
