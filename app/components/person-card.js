import Component from '@glimmer/component';
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';
// import { scale } from 'ember-animated/motions/scale';

export default class PersonCardComponent extends Component {

  @service activePerson;

  @tracked hiddenBio = true;

  @action *transition({ insertedSprites, removedSprites }) {
    insertedSprites.forEach(sprite => {
      fadeIn(sprite);
      // scale(sprite);
    });
    removedSprites.forEach(sprite => {
      fadeOut(sprite);
      // scale(sprite);
    });
  }


  @action toggleBiography() {
    this.hiddenBio = !this.hiddenBio;
  }
}
