import Controller from "@ember/controller";
import { service } from "@ember/service";
import AnnotationsService from "un-silencing-slavery/services/annotations";

export default class GlossaryController extends Controller {
  @service declare annotations: AnnotationsService;

  get glossary() {
    return this.annotations.glossary;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module "@ember/controller" {
  interface Registry {
    glossary: GlossaryController;
  }
}
