import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import people from "rose-hall/data/people";

export default class DataService extends Service {
  @tracked people = people;

  maxAge = 80;

  constructor(args) {
    super(args);
    this.sortByName();
  }

  sortByName() {
    this.people.sort((a, b) => a.name.localeCompare(b.name));
  }
}
