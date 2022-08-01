import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { dasherize } from "@ember/string";

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

export default class GlossaryService extends Service {
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

  get glossaryArray() {
    const glossaryArray = [];
    if (!this.staticGlossary) {
      this.buildGlossary();
    }

    for (const term in this.staticGlossary) {
      glossaryArray.push({
        term,
        slug: dasherize(term),
        definition: this.staticGlossary[term],
      });
    }
    return glossaryArray;
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
}

declare module "@ember/service" {
  interface Registry {
    glossary: GlossaryService;
  }
}
