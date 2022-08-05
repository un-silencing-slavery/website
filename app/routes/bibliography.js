import Route from "@ember/routing/route";
import { service } from "@ember/service";

export default class BibliographyRoute extends Route {
  @service headData;

  beforeModel() {
    this.headData.title = "Bibliography | (Un)Silencing Slavery";
  }
}
