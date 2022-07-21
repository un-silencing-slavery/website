import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import DataService from "un-silencing-slavery-at-rose-hall/services/data";

export default class GlossaryComponent extends Component {
  @service declare data: DataService;

  @action onSingletonDidUpdate(tippySingleton) {
    // console.log(tippySingleton);
    console.log("on singleton did update");
  }

  @action onInstancesCreate(e) {
    console.log("on instances create", e);
  }

  @action onInstancesDidUpdate(e) {
    console.log("on instances did update", e);
  }
}
