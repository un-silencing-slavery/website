import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class InformationHeaderComponent extends Component {
  @tracked sortmenuVisible = false;

  @action toggleSortmenu() {
    this.sortmenuVisible = !this.sortmenuVisible;
  }

  @action hideSortmenu() {
    this.sortmenuVisible = false;
  }
}
