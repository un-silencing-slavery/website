import Component from "@glimmer/component";
import { service } from "@ember/service";
import AnnotationsService from "un-silencing-slavery/services/annotations";

export default class ThesaurusComponent extends Component {
  @service declare annotations: AnnotationsService;
}
