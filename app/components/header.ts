import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class HeaderComponent extends Component {
  @tracked navbarVisible = false;

  @action toggleNavbar() {
    this.navbarVisible = !this.navbarVisible;
  }
}
