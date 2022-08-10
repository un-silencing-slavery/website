import Service from "@ember/service";
import { dasherize } from "@ember/string";
import { htmlSafe } from "@ember/template";
import glossary from "un-silencing-slavery/data/glossary.json";
import thesaurus from "un-silencing-slavery/data/thesaurus.json";
import { SafeString } from "@ember/template/-private/handlebars";

interface GlossaryEntry {
  displayTerm: string;
  slug: string;
  definition: string;
}

interface ThesaurusEntry {
  term: string;
  slug: string;
  definition: SafeString;
}

export default class AnnotationsService extends Service {
  _glossary = glossary;
  _thesaurus = thesaurus;

  get thesaurus() {
    return this._thesaurus.map((thesaurusEntry): ThesaurusEntry => {
      return {
        term: thesaurusEntry.synonym,
        slug: dasherize(thesaurusEntry.synonym),
        definition: this.tooltipize(
          this._glossary.filter(
            (glossaryEntry) =>
              glossaryEntry.headword === thesaurusEntry.glossaryId
          )[0].definition
        ),
      };
    });
  }

  get glossary() {
    return this._glossary
      .map(
        (glossaryEntry): GlossaryEntry => ({
          displayTerm: glossaryEntry.displayTerm,
          slug: glossaryEntry.headword,
          definition: glossaryEntry.definition,
        })
      )
      .sort((a: GlossaryEntry, b: GlossaryEntry) =>
        a.slug.localeCompare(b.slug)
      );
  }

  tooltipize(fullDefinition: string) {
    const [definition] = fullDefinition.split("[READ MORE HERE]");
    if (/p>$/.test(definition)) {
      return htmlSafe(definition);
    }

    return htmlSafe(`${definition}</p>`);
  }
}

declare module "@ember/service" {
  interface Registry {
    annotations: AnnotationsService;
  }
}
