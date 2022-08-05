import Route from "@ember/routing/route";
import { service } from "@ember/service";
import AnnotationsService from "un-silencing-slavery/services/annotations";
import HeadDataService from "un-silencing-slavery/services/head-data";

export default class GlossaryRoute extends Route {
  @service declare annotations: AnnotationsService;

  @service declare headData: HeadDataService;

  beforeModel() {
    this.headData.title = "Glossary | (Un)Silencing Slavery";
  }
}
