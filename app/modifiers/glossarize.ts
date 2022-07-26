import Modifier from "ember-modifier";
import { registerDestructor } from "@ember/destroyable";
import { htmlSafe } from "@ember/template";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import DataService from "un-silencing-slavery/services/data";

function cleanup(instance: GlossarizeModifier) {
  const { elements, event, handler } = instance;

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
    alert(decodeURIComponent(atob(event.target.dataset.glossaryDefinition)));
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
        `<span class="underline decoration-green-100 decoration-2 cursor-pointer glossary-term" data-glossary-definition="${btoa(
          encodeURIComponent(glossary[term])
        )}">${term}</span>`
      );
    }

    while (element.firstChild) {
      if (element.lastChild) {
        element.removeChild(element.lastChild);
      }
    }

    for (const paragraph of profile.split("###")) {
      const paragraphElement = document.createElement("p");
      paragraphElement.innerHTML = htmlSafe(paragraph) as unknown as string;

      element.appendChild(paragraphElement);
    }

    this.elements = element.querySelectorAll("span.glossary-term");

    this.elements.forEach((element) => {
      element.addEventListener("click", this.handler);
    });
  }
}
