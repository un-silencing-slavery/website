import Route from "@ember/routing/route";
import { service } from "@ember/service";

export default class AboutRoute extends Route {
  @service headData;

  beforeModel() {
    this.headData.title = "About | (Un)Silencing Slavery";
  }
}
