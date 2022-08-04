import Route from "@ember/routing/route";
import { service } from "@ember/service";
import AnnotationsService from "un-silencing-slavery/services/annotations";

export default class GlossaryRoute extends Route {
  @service declare annotations: AnnotationsService;

  metaInfo = {
    title: "Glossary | (Un)Silencing Slavery",
  };
}
