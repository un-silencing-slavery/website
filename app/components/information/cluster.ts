import Component from "@glimmer/component";
import { service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import ActivePersonService from "un-silencing-slavery/services/active-person";
import DataService from "un-silencing-slavery/services/data";

interface InformationClusterComponentSignature {
  Element: HTMLElement;
  Args: {
    persons: Person[];
    index: number;
    clusterKey: ClusterKey;
  };
}

export default class InformationClusterComponent extends Component<InformationClusterComponentSignature> {
  @service declare activePerson: ActivePersonService;

  @service declare data: DataService;

  @action toggleCluster() {
    this._toggledVisibility = !this._toggledVisibility;
  }

  @tracked _toggledVisibility = false;

  get containsActivePerson() {
    return (
      this.activePerson.personId &&
      this.args.persons
        .map((person) => person.personId)
        .includes(this.activePerson.personId)
    );
  }

  get isVisible() {
    if (this.containsActivePerson || this._toggledVisibility) {
      return true;
    }

    return false;
  }

  get categories() {
    return this.data.sortOrders[this.args.clusterKey];
  }

  get colors() {
    return "bg-category-0 bg-category-1 bg-category-2 bg-category-3 bg-category-4 bg-category-5 bg-category-6 bg-category-7".split(
      " "
    );
  }
}
