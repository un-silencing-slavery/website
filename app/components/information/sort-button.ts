import Component from "@glimmer/component";
import { service } from "@ember/service";
import { action } from "@ember/object";
import type DataService from "un-silencing-slavery/services/data";

interface SortButtonComponentArgs {
  close: () => void;
  sortKey: SortKey;
}

export default class SortButtonComponent extends Component<SortButtonComponentArgs> {
  @service declare data: DataService;

  @action sort() {
    this.args.close();
    this.data.sortKey = this.args.sortKey;
  }

  get isActive() {
    return this.data.sortKey === this.args.sortKey;
  }
}
