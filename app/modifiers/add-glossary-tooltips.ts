import Modifier, { ArgsFor } from "ember-modifier";
import { registerDestructor } from "@ember/destroyable";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import AnnotationsService from "un-silencing-slavery/services/annotations";
import { createPopper } from "@popperjs/core";

interface AddGlossaryTooltipsModifierSignature {
  Element: HTMLElement;
  Args: {
    Positional: [string];
  };
}

interface ElementWithListeners {
  element: Element;
  showHandler: EventListener;
  hideHandler: EventListener;
}

function cleanup(instance: AddGlossaryTooltipsModifier) {
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

export default class AddGlossaryTooltipsModifier extends Modifier<AddGlossaryTooltipsModifierSignature> {
  @service declare annotations: AnnotationsService;

  @tracked declare elements: NodeListOf<Element> | [];

  @tracked elementsWithListeners: ElementWithListeners[] = [];

  showEvents = ["mouseenter", "focus"];

  hideEvents = ["mouseleave", "blur"];

  constructor(
    owner: unknown,
    args: ArgsFor<AddGlossaryTooltipsModifierSignature>
  ) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  show(tooltip: Element, popperInstance: { update: () => void }) {
    tooltip.setAttribute("data-show", "");
    popperInstance.update();
  }

  hide(tooltip: Element) {
    tooltip.removeAttribute("data-show");
  }

  modify(element: Element, [htmlProfile]: [string]) {
    if (htmlProfile) {
      this.elements = element.querySelectorAll(".thesaurus-term");

      for (const termElement of this.elements) {
        const slug = this.annotations.thesaurus.filter(
          (term) => term.term === termElement.textContent
        )[0].slug;

        const tooltip = document.querySelector(
          `#thesaurus-definition-${slug}`
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
