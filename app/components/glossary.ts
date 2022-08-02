import Component from "@glimmer/component";
import { service } from "@ember/service";
import GlossaryService from "un-silencing-slavery/services/glossary";

export default class GlossaryComponent extends Component {
  @service declare glossary: GlossaryService;
}
