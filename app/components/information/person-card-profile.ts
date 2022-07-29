import { htmlSafe } from "@ember/template";
import Component from "@glimmer/component";
import { service } from "@ember/service";
import DataService from "un-silencing-slavery/services/data";

interface InformationPersonCardProfileComponentArgs {
  profile: string;
}
export default class InformationPersonCardProfileComponent extends Component<InformationPersonCardProfileComponentArgs> {
  @service declare data: DataService;

  get htmlProfile() {
    let profile = this.args.profile;

    for (const entry of this.data.glossaryArray) {
      profile = profile.replaceAll(
        entry.term,
        `<strong class="underline decoration-green-100 decoration-2 cursor-pointer glossary-term" 
            aria-describedBy="${entry.slug}-definition"
            data-glossary-definition="${btoa(
          encodeURIComponent(entry.definition)
        )}">${entry.term}</strong>`
      );
      // console.log(entry.term);
    }

    // this.updater = Date.now();
    return htmlSafe(
      profile
        .split("###")
        .map((paragraph) => `<p>${paragraph}</p>`)
        .join("\n")
    );
  }
}
