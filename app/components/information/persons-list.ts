import Component from "@glimmer/component";
import { service } from "@ember/service";
import ActivePersonService from "un-silencing-slavery/services/active-person";
import DataService from "un-silencing-slavery/services/data";
import groupBy from "un-silencing-slavery/utils/group-by";

interface InformationPersonsListComponentSignature {
  Element: HTMLElement;
  Args: {
    sortedPersons: Person[];
    sortKey: SortKey;
  };
}

export default class InformationPersonsListComponent extends Component<InformationPersonsListComponentSignature> {
  @service declare activePerson: ActivePersonService;

  @service declare data: DataService;

  get clustered() {
    return ["gender", "colour", "nativity", "duties"].includes(
      this.args.sortKey
    );
  }

  get clusterKey(): ClusterKey {
    return this.args.sortKey as ClusterKey;
  }

  get clusters() {
    const key = this.clusterKey;
    const clusteredPersons = groupBy(
      this.args.sortedPersons,
      this.data.clusterColumnMapping[key]
    );

    return this.data.sortOrders[key].map((category) =>
      clusteredPersons.get(category)
    );
  }
}
