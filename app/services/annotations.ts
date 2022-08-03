import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { dasherize } from "@ember/string";

interface GlossaryEntry {
  displayTerm: string;
  slug: string;
  definition: string;
  synonyms: string[];
}

interface AirtableGlossaryEntry {
  fields: {
    "display-term": string;
    headword: string;
    definition: string;
    thesaurus: string[];
  };
  id: string;
}

interface AirtableThesaurusEntry {
  fields: {
    synonym: string;
    "glossary-headword": string[];
  };
  id: string;
}

export default class AnnotationsService extends Service {
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

  get thesaurusArray() {
    const thesaurusArray = [];
    if (!this.staticThesaurus) {
      this.buildThesaurus();
    }

    for (const term in this.staticThesaurus) {
      thesaurusArray.push({
        term,
        slug: dasherize(term),
        definition: this.staticThesaurus[term],
      });
    }
    return thesaurusArray;
  }

  get glossary() {
    console.log("getting glossary");
    if (!this.staticGlossary) {
      this.buildGlossary();
      return this.staticGlossary;
    }

    return this.staticGlossary;
  }

  get thesaurus() {
    if (!this.staticThesaurus) {
      this.buildThesaurus();
      return this.staticThesaurus;
    }

    return this.staticThesaurus;
  }

  declare staticThesaurus: Record<string, string>;

  staticGlossary: GlossaryEntry[] = [];

  @tracked airtableGlossary: AirtableGlossaryEntry[] = [];

  @tracked airtableThesaurus: AirtableThesaurusEntry[] = [];

  async buildGlossary() {
    console.log("building glossary");
    if (!this.airtableGlossary) {
      this.airtableGlossary = await this.fetchFromAirtable("glossary");
    }
    if (!this.airtableThesaurus) {
      this.airtableThesaurus = await this.fetchFromAirtable("thesaurus");
    }

    this.staticGlossary = this.airtableGlossary.map((airtableEntry) => {
      const synonyms = airtableEntry.fields.thesaurus.map(
        (thesaurusId) =>
          this.airtableThesaurus.filter(
            (thesaurusEntry) => thesaurusId === thesaurusEntry.id
          )[0].fields.synonym
      );

      return {
        displayTerm: airtableEntry.fields["display-term"],
        slug: airtableEntry.fields.headword,
        definition: airtableEntry.fields.definition,
        synonyms,
      };
    });
  }

  async buildThesaurus() {
    const thesaurus: Record<string, string> = {};
    if (!this.airtableGlossary) {
      this.airtableGlossary = await this.fetchFromAirtable("glossary");
    }
    if (!this.airtableThesaurus) {
      this.airtableThesaurus = await this.fetchFromAirtable("thesaurus");
    }

    for (const entry of this.airtableThesaurus) {
      const headword = entry.fields["glossary-headword"][0];
      thesaurus[entry.fields.synonym] = this.airtableGlossary.filter(
        (entry) => entry.id === headword
      )[0].fields.definition;
    }

    this.staticThesaurus = thesaurus;
  }
}

declare module "@ember/service" {
  interface Registry {
    annotations: AnnotationsService;
  }
}
