import Component from "@glimmer/component";
import { service } from "@ember/service";
import ActivePersonService from "un-silencing-slavery/services/active-person";
import DataService from "un-silencing-slavery/services/data";

interface InformationPersonsListComponentSignature {
  Element: HTMLElement;
  Args: {
    sortedPersons: Person[];
  };
}

export default class InformationPersonsListComponent extends Component<InformationPersonsListComponentSignature> {
  @service declare activePerson: ActivePersonService;

  @service declare data: DataService;

  groupBy = <T>(array: T[], predicate: (v: T) => string) =>
    array.reduce((acc, value) => {
      (acc[predicate(value)] ||= []).push(value);
      return acc;
    }, {} as { [key: string]: T[] });

  get clusterKey(): ClusterKey {
    return this.data.sortKey as ClusterKey;
  }

  get clustered() {
    return ["gender", "colour", "nativity", "duties"].includes(
      this.data.sortKey
    );
  }

  get clusters() {
    const key = this.clusterKey;
    const clusteredPersons = this.groupBy(
      this.args.sortedPersons,
      (person) => person[this.data.clusterColumnMapping[key]]
    );

    return this.data.sortOrders[key].map(
      (category) => clusteredPersons[category]
    );
  }
}
