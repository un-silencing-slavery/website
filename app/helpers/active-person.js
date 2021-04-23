import { tracked } from '@glimmer/tracking';
import { Resource } from 'ember-could-get-used-to-this';

class ActivePerson extends Resource {
  @tracked personId = null;

  get id() {
    return this.personId;
  }

  // setup() {
  //   this.intervalId = setInterval(() => this.count++, this.args.positional[0]);
  // }

  // update() {
  //   clearInterval(this.intervalId);
  //   this.intervalId = setInterval(() => this.count++, this.args.positional[0]);
  // }

  // teardown() {
  //   clearInterval(this.intervalId);
  // }
}
