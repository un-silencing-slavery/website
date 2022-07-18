import Modifier from "ember-modifier";
import { registerDestructor } from "@ember/destroyable";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import DataService from "un-silencing-slavery-at-rose-hall/services/data";

function cleanup(instance: GlossarizeModifier) {
  let { elements, event, handler } = instance;

  if (elements && event && handler) {
    console.log("cleaning up");
    for (const element of elements) {
      element.removeEventListener(event, handler);
    }
    instance.elements = [];
    instance.event = null;
    instance.handler = null;
  }
}

export default class GlossarizeModifier extends Modifier {
  @service declare data: DataService;

  @tracked declare elements: NodeListOf<HTMLSpanElement>;

  event: null | string = "click";

  handler(event: Event) {
    alert(event.target.dataset.glossaryDefinition);
  }

  constructor(owner: unknown, args: unknown) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  modify(element: Element, [profile]: [string]) {
    const glossary = this.data.glossary;
    for (const term in glossary) {
      profile = profile.replaceAll(
        term,
        `<span class="underline decoration-green-100 decoration-2 cursor-pointer glossary-term" data-glossary-definition="${glossary[term]}">${term}</span>`
      );
    }

    element.innerHTML = profile;

    this.elements = element.querySelectorAll("span.glossary-term");

    this.elements.forEach((element) => {
      element.addEventListener("click", this.handler);
    });
  }
}
