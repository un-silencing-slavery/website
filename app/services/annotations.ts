import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { dasherize } from "@ember/string";
import { htmlSafe } from "@ember/template";

interface GlossaryEntry {
  displayTerm: string;
  slug: string;
  definition: string;
}

interface ThesaurusEntry {
  term: string;
  slug: string;
  definition: string;
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

  get thesaurus() {
    if (this.staticThesaurus.length < 1) {
      this.buildThesaurus();
    }

    return this.staticThesaurus;
  }

  tooltipize(fullDefinition: string) {
    const [definition] = fullDefinition.split("[READ MORE HERE]");
    if (/p>$/.test(definition)) {
      return htmlSafe(definition);
    }

    return htmlSafe(`${definition}</p>`);
  }

  async buildThesaurus() {
    if (this.glossary.length < 1) {
      this.buildGlossary();
    }
    const airtableGlossary = await this.fetchFromAirtable("glossary");
    const airtableThesaurus = await this.fetchFromAirtable("thesaurus");

    // const thesaurus: Record<string, string> = airtableThesaurus.map(
    this.staticThesaurus = airtableThesaurus.map(
      (thesaurusEntry: AirtableThesaurusEntry) => ({
        term: thesaurusEntry.fields.synonym,
        slug: dasherize(thesaurusEntry.fields.synonym),
        definition: this.tooltipize(
          airtableGlossary.filter(
            (glossaryEntry: AirtableGlossaryEntry) =>
              glossaryEntry.id === thesaurusEntry.fields["glossary-headword"][0]
          )[0].fields.definition
        ),
      })
    );
  }

  @tracked staticThesaurus: ThesaurusEntry[] = [];

  get glossary() {
    if (this.staticGlossary.length < 1) {
      this.buildGlossary();
      return this.staticGlossary;
    }

    return this.staticGlossary;
  }

  @tracked staticGlossary: GlossaryEntry[] = [];

  async buildGlossary() {
    const airtableGlossary = await this.fetchFromAirtable("glossary");

    this.staticGlossary = airtableGlossary
      .map((airtableEntry: AirtableGlossaryEntry) => ({
        displayTerm: airtableEntry.fields["display-term"],
        slug: airtableEntry.fields.headword,
        definition: airtableEntry.fields.definition,
      }))
      .sort((a: GlossaryEntry, b: GlossaryEntry) =>
        a.slug.localeCompare(b.slug)
      );
  }
}

declare module "@ember/service" {
  interface Registry {
    annotations: AnnotationsService;
  }
}
