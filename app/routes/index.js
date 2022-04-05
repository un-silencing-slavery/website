import Route from "@ember/routing/route";
import people from "rose-hall/data/people";

export default class IndexRoute extends Route {
  model() {
    return people;
  }
}
