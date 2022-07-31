import Modifier from "ember-modifier";
import { registerDestructor } from "@ember/destroyable";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import GlossaryService from "un-silencing-slavery/services/glossary";
import { createPopper } from "@popperjs/core";

function cleanup(instance: GlossarizeModifier) {
  const { elements, elementsWithListeners, showEvents, hideEvents } = instance;

  if (elements && elementsWithListeners && showEvents && hideEvents) {
    for (const elementWithListeners of elementsWithListeners) {
      const { element, showHandler, hideHandler } = elementWithListeners;
      for (const hideEvent of hideEvents) {
        element.removeEventListener(hideEvent, hideHandler);
      }
      for (const showEvent of showEvents) {
        element.removeEventListener(showEvent, showHandler);
      }
    }
    instance.elements = [];
    instance.elementsWithListeners = [];
  }
}

interface ElementWithListeners {
  element: Element;
  showHandler: any;
  hideHandler: any;
}

export default class GlossarizeModifier extends Modifier {
  @service declare glossary: GlossaryService;

  @tracked declare elements: NodeListOf<Element> | [];

  @tracked elementsWithListeners: ElementWithListeners[] = [];

  showEvents = ["mouseenter", "focus"];

  hideEvents = ["mouseleave", "blur"];

  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  modify(element: Element, [htmlProfile]: [string]) {
    if (htmlProfile) {
      this.elements = element.querySelectorAll(".glossary-term");

      for (const termElement of this.elements) {
        const slug = this.glossary.glossaryArray.filter(
          (term) => term.term === termElement.textContent
        )[0].slug;

        const tooltip = document.querySelector(
          `#glossary-definition-${slug}`
        ) as HTMLElement;

        if (tooltip) {
          const popperInstance = createPopper(termElement, tooltip, {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 8],
                },
              },
            ],
          });

          function show() {
            tooltip.setAttribute("data-show", "");
            popperInstance.update();
          }

          function hide() {
            tooltip.removeAttribute("data-show");
          }

          this.showEvents.forEach((event) =>
            termElement.addEventListener(event, show)
          );

          this.hideEvents.forEach((event) =>
            termElement.addEventListener(event, hide)
          );

          if (
            this.elementsWithListeners.filter(
              (elementWithListener) =>
                elementWithListener.element === termElement
            ).length === 0
          ) {
            this.elementsWithListeners.push({
              element: termElement,
              showHandler: show,
              hideHandler: hide,
            });
          }
        }
      }
    }
  }
}
