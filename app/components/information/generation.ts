import { service } from "@ember/service";
import Component from "@glimmer/component";
import ActivePersonService from "un-silencing-slavery/services/active-person";
import DataService from "un-silencing-slavery/services/data";

interface InformationGenerationComponentSignature {
  Element: Element;
  Args: {
    generation: string | Record<string, unknown>;
    liClasses: string;
  };
}

export default class InformationGenerationComponent extends Component<InformationGenerationComponentSignature> {
  @service declare data: DataService;

  @service declare activePerson: ActivePersonService;

  get isLeaf() {
    return this.args.generation instanceof String;
  }
}
