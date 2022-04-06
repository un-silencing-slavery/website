import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import people from "rose-hall/data/people";

type PersonId = string | null;
interface Family {
  mother: PersonId;
  children: (PersonId | Family)[];
}

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
        this.people.sort(
          (a, b) => (a.birthYear || 1833) - (b.birthYear || 1833)
        );
        break;
      case "race":
        this.people.sort((a, b) =>
          (a.color || "z").localeCompare(b.color || "z")
        );
        break;
      case "origin":
        this.people.sort((a, b) =>
          (a.country || "z").localeCompare(b.country || "z")
        );
        break;
      case "gender":
        this.people.sort((a, b) =>
          (a.gender || "z").localeCompare(b.gender || "z")
        );
        break;
      case "family":
        // const people = [];
        this.sortByFamily();
        break;
      default:
        break;
    }

    return this.people;
  }

  sortByFamily() {
    this.people.sort((a, b) =>
      (a.motherId || "unknown").localeCompare(b.motherId || "unknown")
    );
  }
}

declare module "@ember/service" {
  interface Registry {
    data: DataService;
  }
}
