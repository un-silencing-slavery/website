import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { service } from "@ember/service";
import RouterService from "@ember/routing/router-service";

export default class InformationHeaderComponent extends Component {
  @tracked sortmenuVisible = false;

  @service declare router: RouterService;

  sortKeys: SortKey[] = [
    "name",
    "age",
    "nativity",
    "colour",
    "gender",
    "matrilineage",
    "duties",
  ];

  get route() {
    return this.router.currentRouteName;
  }

  @action toggleSortmenu() {
    this.sortmenuVisible = !this.sortmenuVisible;
  }

  @action hideSortmenu() {
    this.sortmenuVisible = false;
  }
}
