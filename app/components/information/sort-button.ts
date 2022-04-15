import Component from "@glimmer/component";
import { service } from "@ember/service";
import { action } from "@ember/object";
import type DataService from "un-silencing-slavery-at-rose-hall/services/data";

interface SortButtonComponentArgs {
  sortKey: SortKey;
}

export default class SortButtonComponent extends Component<SortButtonComponentArgs> {
  @service declare data: DataService;

  @action sort() {
    this.data.sortKey = this.args.sortKey;
  }

  get isActive() {
    return this.data.sortKey === this.args.sortKey;
  }
}
