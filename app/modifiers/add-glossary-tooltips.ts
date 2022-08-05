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
  clickHandler: EventListener;
}

function cleanup(instance: AddGlossaryTooltipsModifier) {
  const { elements, elementsWithListeners } = instance;

  if (elements && elementsWithListeners) {
    for (const elementWithListeners of elementsWithListeners) {
      const { element, clickHandler } = elementWithListeners;
      element.removeEventListener("click", clickHandler);
    }
    instance.elements = [];
    instance.elementsWithListeners = [];
  }
}

export default class AddGlossaryTooltipsModifier extends Modifier<AddGlossaryTooltipsModifierSignature> {
  @service declare annotations: AnnotationsService;

  @tracked declare elements: NodeListOf<Element> | [];

  @tracked elementsWithListeners: ElementWithListeners[] = [];

  constructor(
    owner: unknown,
    args: ArgsFor<AddGlossaryTooltipsModifierSignature>
  ) {
    super(owner, args);
    registerDestructor(this, cleanup);
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

          function handleClick() {
            if (tooltip.hasAttribute("data-show")) {
              tooltip.removeAttribute("data-show");
            } else {
              tooltip.setAttribute("data-show", "");
              popperInstance.update();
            }
          }

          termElement.addEventListener("click", handleClick);

          if (
            this.elementsWithListeners.filter(
              (elementWithListener) =>
                elementWithListener.element === termElement
            ).length === 0
          ) {
            this.elementsWithListeners.push({
              element: termElement,
              clickHandler: handleClick,
            });
          }
        }
      }
    }
  }
}
