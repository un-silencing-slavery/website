import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import people from "un-silencing-slavery/data/people";
import groupBy from "un-silencing-slavery/utils/group-by";

export default class DataService extends Service {
  @tracked people = people as Person[];

  @tracked sortKey: SortKey = "name";

  maxAge = 80;

  sortOrders: Record<ClusterKey, string[]> = {
    colour: [
      "Negro",
      "Mulatto",
      "Sambo",
      "Quadroon",
      "Inconsistent",
      "Unknown",
    ],
    duties: [
      "Field Workers",
      "Craft Workers",
      "Domestic Workers",
      "Livestock Workers",
      "“Not at Work”",
      "Not at Rose Hall in 1832",
    ],
    nativity: ["African", "Creole", "Inconsistent", "Unknown"],
    gender: ["Female", "Male", "Unknown"],
  };

  clusterColumnMapping: Record<ClusterKey, keyof Person> = {
    colour: "colour",
    duties: "dutyCategory",
    nativity: "country",
    gender: "gender",
  };

  customSort() {
    const customSortKeys = Object.keys(this.sortOrders);
    if (customSortKeys.includes(this.sortKey)) {
      const customSort = this.sortKey as ClusterKey;
      const ordering = new Map(
        this.sortOrders[customSort].map((v: string, i: number) => [v, i])
      );

      this.people.sort(
        (a, b) =>
          ordering.get(a[this.clusterColumnMapping[customSort]]) -
          ordering.get(b[this.clusterColumnMapping[customSort]])
      );
    }
  }

  sortedPersons(sortKey: SortKey) {
    this.sortKey = sortKey;
    switch (sortKey) {
      case "name":
        this.people.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "age":
        this.people.sort(
          (a, b) => (a.birthYear || 1833) - (b.birthYear || 1833)
        );
        break;
      case "colour":
        this.customSort();
        break;
      case "nativity":
        this.customSort();
        break;
      case "gender":
        this.customSort();
        break;
      case "matrilineage":
        this.sortByFamily();
        break;
      case "duties":
        this.customSort();
        break;
      default:
        break;
    }

    return this.people;
  }

  sortByFamily() {
    // cluster by moms
    const motherClusters = groupBy(
      this.people,
      (person) => person.motherId ?? "None"
    );

    console.log(motherClusters);

    const movePerson = (fromIndex: number, toIndex: number) => {
      const element = this.people[fromIndex];
      this.people.splice(fromIndex, 1);
      this.people.splice(toIndex, 0, element);
    };

    this.people.sort((a, b) => {
      // Matriarchs to the front.
      if (a.motherId === null && b.motherId === null) {
        return (
          this.people.filter((person) => person.motherId === b.personId)
            .length -
          this.people.filter((person) => person.motherId === a.personId).length
        );
      }

      return (a.motherId || "").localeCompare(b.motherId || "");
    });

    for (let i = 0; i < this.people.length; i += 1) {
      const person = this.people[i];
      const children = this.people.filter(
        (child) => child.motherId === person.personId
      );
      if (children.length > 0) {
        for (const child of children) {
          movePerson(this.people.indexOf(child), i + 1);
        }
      }
    }
  }
}

declare module "@ember/service" {
  interface Registry {
    data: DataService;
  }
}
