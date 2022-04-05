import Service from "@ember/service";
import people from "rose-hall/data/people";
import { tracked } from "@glimmer/tracking";

export default class DataService extends Service {
  @tracked people = [];

  maxAge = 80;

  constructor(args) {
    super(args);
    this.sortByName(people);
  }

  sortByName(data = this.people) {
    this.people = data.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByAge(data = this.people;
}
