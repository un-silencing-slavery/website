import Route from "@ember/routing/route";
import { service } from "@ember/service";

export default class CreditsRoute extends Route {
  @service headData;

  beforeModel() {
    this.headData.title = "Credits | (Un)Silencing Slavery";
  }
}
