import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import people from "un-silencing-slavery/data/people";

interface GlossaryEntry {
  fields: {
    headword: string;
    definition: string;
  };
  id: string;
}

interface ThesaurusEntry {
  fields: {
    synonym: string;
    "glossary-headword": string[];
  };
  id: string;
}

export default class DataService extends Service {
  airtableKey = "keybjUbsLJQQ77ZJ0";

  async fetchFromAirtable(table: string) {
    const url = `https://api.airtable.com/v0/appp15gSecfp0vBPk/${table}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.airtableKey}`,
      },
    });
    const data = await response.json();
    return data.records;
  }

  get glossary() {
    if (!this.staticGlossary) {
      this.buildGlossary();
      return this.staticGlossary;
    }

    return this.staticGlossary;
  }

  @tracked declare staticGlossary: Record<string, string>;

  async buildGlossary() {
    const glossary: Record<string, string> = {};
    const glossaryTable: GlossaryEntry[] = await this.fetchFromAirtable(
      "glossary"
    );
    const thesaurusTable: ThesaurusEntry[] = await this.fetchFromAirtable(
      "thesaurus"
    );

    for (const entry of thesaurusTable) {
      const headword = entry.fields["glossary-headword"][0];
      glossary[entry.fields.synonym] = glossaryTable.filter(
        (entry) => entry.id === headword
      )[0].fields.definition;
    }

    this.staticGlossary = glossary;
  }

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
          (a.colour || "z").localeCompare(b.colour || "z")
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
        this.sortByFamily();
        break;
      // case "duties":
      // Duties requires a macro grouping of the various duties.
      //   break;
      default:
        break;
    }

    return this.people;
  }

  sortByFamily() {
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
