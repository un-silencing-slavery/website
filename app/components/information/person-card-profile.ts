import { htmlSafe } from "@ember/template";
import Component from "@glimmer/component";
import { service } from "@ember/service";
import GlossaryService from "un-silencing-slavery/services/glossary";

interface InformationPersonCardProfileComponentArgs {
  profile: string;
}

export default class InformationPersonCardProfileComponent extends Component<InformationPersonCardProfileComponentArgs> {
  @service declare glossary: GlossaryService;

  get htmlProfile() {
    let profile = this.args.profile;

    for (const entry of this.glossary.glossaryArray) {
      profile = profile.replaceAll(
        entry.term,
        `<span class="underline decoration-green-100 decoration-2 cursor-pointer glossary-term" 
          aria-describedBy="${entry.slug}-definition">${entry.term}</span>`
      );
    }

    return htmlSafe(
      profile
        .split("###")
        .map((paragraph) => `<p>${paragraph}</p>`)
        .join("\n")
    );
  }
}
