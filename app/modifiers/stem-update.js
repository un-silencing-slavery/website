import Modifier from "ember-modifier";
import { service } from "@ember/service";

export default class StemUpdateModifier extends Modifier {
  @service svg;

  modify(element, [stem, width, dots]) {
    console.log("firing stem-update.");
    if (width > 0) {
      console.log(`width is ${width}`);
      stem = element;
      // console.log("element", element);
      // console.log("stem", stem);
      console.log("dots", dots);
    }
  }
}
