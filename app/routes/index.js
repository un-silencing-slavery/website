import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import faker from "faker";
import people from "rose-hall/data/people";

export default class IndexRoute extends Route {
  model() {
    return people;
  }
}
