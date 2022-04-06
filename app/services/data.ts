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
    const moveItem = (fromIndex: number, toIndex: number) => {
      const element = this.people[fromIndex];
      this.people.splice(fromIndex, 1);
      this.people.splice(toIndex, 0, element);
    };

    this.people.sort((a, b) =>
      (a.motherId || "unknown").localeCompare(b.motherId || "unknown")
    );

    let index = this.people.length - 1;
    while (index >= 0) {
      const person = this.people[index];
      const children = this.people.filter(
        (child) => child.motherId === person.personId
      );
      if (children.length > 0) {
        const firstChildIndex = this.people.indexOf(children[0]);
        if (index !== firstChildIndex - 1) {
          moveItem(index, firstChildIndex);
        } else {
          index -= 1;
        }
      } else {
        index -= 1;
      }
    }
  }
}

declare module "@ember/service" {
  interface Registry {
    data: DataService;
  }
}
