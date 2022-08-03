import { htmlSafe } from "@ember/template";
import Component from "@glimmer/component";
import { service } from "@ember/service";
import AnnotationsService from "un-silencing-slavery/services/annotations";

interface InformationPersonCardProfileComponentArgs {
  profile: string;
}

export default class InformationPersonCardProfileComponent extends Component<InformationPersonCardProfileComponentArgs> {
  @service declare annotations: AnnotationsService;

  get htmlProfile() {
    let profile = this.args.profile;

    for (const entry of this.annotations.thesaurusArray) {
      profile = profile.replaceAll(
        entry.term,
        `<span class="underline decoration-green-100 decoration-2 cursor-pointer thesaurus-term" 
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
