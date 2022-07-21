import Modifier from "ember-modifier";
import { htmlSafe } from "@ember/template";
import { dasherize } from "@ember/string";
import { service } from "@ember/service";
import { registerDestructor } from "@ember/destroyable";
import DataService from "un-silencing-slavery-at-rose-hall/services/data";

export default class GlossarizeModifier extends Modifier {
  @service declare data: DataService;

  cleanup = () => {
    console.log("doing some glossarize cleanup");
  };

  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, this.cleanup);
  }

  modify(element: Element, [profile]: [string]) {
    const glossary = this.data.glossary;
    for (const term in glossary) {
      profile = profile.replaceAll(
        term,
        `<span class="underline decoration-green-100 decoration-2
          glossary-term
          glossary-term-${dasherize(term)}
          ">${term}</span>`
      );
    }

    while (element.firstChild) {
      if (element.lastChild) {
        element.removeChild(element.lastChild);
      }
    }

    const profileElement = document.createElement("p");
    profileElement.innerHTML = htmlSafe(profile);

    element.appendChild(profileElement);
  }
}
