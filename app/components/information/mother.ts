import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { service } from "@ember/service";
import ActivePersonService from "un-silencing-slavery/services/active-person";
import DataService from "un-silencing-slavery/services/data";

interface InformationMotherComponentSignature {
  Element: HTMLLIElement;
  Args: {
    motherId: string;
    offspring: Generation;
    motherBgClasses: string;
    liClasses: string;
  };
}

export default class InformationMotherComponent extends Component<InformationMotherComponentSignature> {
  @service declare data: DataService;

  @service declare activePerson: ActivePersonService;

  get descendantIsActive() {
    if (this.activePerson.personId) {
      return this.data
        .flatFamily(this.args.offspring)
        .includes(this.activePerson.personId);
    }

    return false;
  }

  get offspringVisible() {
    return (
      this.activePerson.personId === this.args.motherId ||
      this.descendantIsActive ||
      this._offspringVisible
    );
  }

  @tracked _offspringVisible = false;

  @action toggleOffspring() {
    this._offspringVisible = !this._offspringVisible;
  }
}
