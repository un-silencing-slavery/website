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
    let profile = this.args.profile
      .split("###")
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("\n");

    for (const term in this.data.glossary) {
      profile = profile.replaceAll(
        term,
        `<span class="underline decoration-green-100 decoration-2 cursor-pointer glossary-term" 
          aria-describedBy="${term}-definition"
          data-glossary-definition="${btoa(
          encodeURIComponent(this.data.glossary[term])
        )}">${term}</span>`
      );
    }

    return htmlSafe(profile);
  }
}
