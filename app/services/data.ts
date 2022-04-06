import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import people from "rose-hall/data/people";

export default class DataService extends Service {
  @tracked people = people as Person[];

  @tracked sortKey: SortKey = "name";

  maxAge = 80;

  get sortedData() {
    switch (this.sortKey) {
      case "name":
        this.people.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "age":
        this.people.sort((a, b) => {
          let aBirthYear = 1833;
          let bBirthYear = 1833;
          if (a.birthYear) {
            aBirthYear = a.birthYear;
          }
          if (b.birthYear) {
            bBirthYear = b.birthYear;
          }
          return aBirthYear - bBirthYear;
        });
        break;
      default:
        break;
    }

    return this.people;
  }
}

declare module "@ember/service" {
  interface Registry {
    data: DataService;
  }
}
