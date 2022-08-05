import Route from "@ember/routing/route";
import { service } from "@ember/service";

export default class ReflectionsRoute extends Route {
  @service headData;

  beforeModel() {
    this.headData.title = "Reflections | (Un)Silencing Slavery";
  }
}
