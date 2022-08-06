import Helper from "@ember/component/helper";
import { service } from "@ember/service";
import DataService from "un-silencing-slavery/services/data";

interface GetPersonHelperSignature {
  Args: {
    Positional: [string];
  };
  Return: Person | null;
}

export default class GetPersonHelper extends Helper<GetPersonHelperSignature> {
  @service declare data: DataService;

  compute([personId]: [string]): Person | null {
    const people = this.data.peopleAsObject;
    return people[personId];
  }
}

export function getPerson([personId]: [string] /*, hash*/) {
  personId;
}
