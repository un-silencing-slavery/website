import Modifier from "ember-modifier";
import { registerDestructor } from "@ember/destroyable";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import DataService from "un-silencing-slavery/services/data";
import { createPopper } from "@popperjs/core";

// function cleanup(instance: GlossarizeModifier) {
//   const { elements, event, handler } = instance;

//   if (elements && event && handler) {
//     console.log("cleaning up");
//     for (const element of elements) {
//       element.removeEventListener(event, handler);
//     }
//     instance.elements = [];
//     instance.event = null;
//     instance.handler = null;
//   }
// }

type ShowEvents = ["mouseenter", "focus"];
type HideEvents = ["mouseleave", "blur"];

interface ElementWithListeners {
  element: Element;
  showEvents: ShowEvents;
  hideEvents: HideEvents;
  showHandler: Function;
  hideHandler: Function;
}

export default class GlossarizeModifier extends Modifier {
  @service declare data: DataService;

  @tracked declare elements: NodeListOf<Element>;

  @tracked declare elementsWithListeners: ElementWithListeners[];

  // constructor(owner: unknown, args: unknown) {
  //   // super(owner, args);
  //   // registerDestructor(this, cleanup);
  // }

  modify(element: Element, [htmlProfile]: [string]) {
    if (htmlProfile) {
      this.elements = element.querySelectorAll(".glossary-term");

      for (const termElement of this.elements) {
        const slug = this.data.glossaryArray.filter(
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

          ["mouseenter", "focus"].forEach((event) =>
            termElement.addEventListener(event, show)
          );

          ["mouseleave", "blur"].forEach((event) =>
            termElement.addEventListener(event, hide)
          );

          // this.elementsWithListeners.push({
          //   element: termElement,
          // });
        }
      }
    }
  }
}
