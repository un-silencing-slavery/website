import Component from "@glimmer/component";
import { service } from "@ember/service";
import GlossaryService from "un-silencing-slavery/services/glossary";
import { htmlSafe } from "@ember/template";

export default class GlossaryPageComponent extends Component {
  @service declare glossary: GlossaryService;
}
