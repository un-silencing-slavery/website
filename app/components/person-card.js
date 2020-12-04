import Component from '@glimmer/component';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class PersonCardComponent extends Component {

  @tracked hiddenBio = true;

  @action toggleBiography() {
    this.hiddenBio = !this.hiddenBio;
  }
}
