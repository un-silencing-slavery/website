import Service from '@ember/service';
import { tracked } from "@glimmer/tracking";

export default class ActivePersonService extends Service {

  @tracked personId = null;

}
