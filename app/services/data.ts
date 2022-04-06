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
      case "race":
        this.people.sort((a, b) => {
          let aColor = "unknown";
          let bColor = "unknown";
          if (a.color) {
            aColor = a.color;
          }
          if (b.color) {
            bColor = b.color;
          }
          return aColor.localeCompare(bColor);
        });
        break;
      case "origin":
        this.people.sort((a, b) => {
          let aCountry = "unknown";
          let bCountry = "unknown";
          if (a.country) {
            aCountry = a.country;
          }
          if (b.country) {
            bCountry = b.country;
          }
          return aCountry.localeCompare(bCountry);
        });
        break;
      case "gender":
        this.people.sort((a, b) => {
          let aGender = "unknown";
          let bGender = "unknown";
          if (a.gender) {
            aGender = a.gender;
          }
          if (b.gender) {
            bGender = b.gender;
          }
          return aGender.localeCompare(bGender);
        });
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
    const people = []; //: Person[] = [];
    const greatGrandmotherIds = [
      ...new Set(this.people.map((person) => person.greatgrandmotherId)),
    ];
    const grandmotherIds = [
      ...new Set(this.people.map((person) => person.grandmotherId)),
    ];
    const motherIds = [
      ...new Set(this.people.map((person) => person.motherId)),
    ];

    console.log(greatGrandmotherIds, grandmotherIds, motherIds);
    // return this.people;
  }
}

declare module "@ember/service" {
  interface Registry {
    data: DataService;
  }
}
