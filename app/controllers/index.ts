import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import DataService from "un-silencing-slavery/services/data";

export default class IndexController extends Controller {
  @service declare data: DataService;

  queryParams = ["sort"];

  @tracked sort: SortKey = "name";

  get sortedPersons() {
    return this.data.sortedPersons(this.sort);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module "@ember/controller" {
  interface Registry {
    index: IndexController;
  }
}
