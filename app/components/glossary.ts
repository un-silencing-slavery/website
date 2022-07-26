import Component from "@glimmer/component";
import { service } from "@ember/service";
import DataService from "un-silencing-slavery/services/data";

export default class GlossaryComponent extends Component {
  @service declare data: DataService;
}
