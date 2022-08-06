import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import DataService from "un-silencing-slavery/services/data";
import ModalIndexService from "un-silencing-slavery/services/modal-index";

export default class IndexController extends Controller {
  @service declare modalIndex: ModalIndexService;

  @service declare data: DataService;

  queryParams = ["sort"];

  @tracked declare sort: SortKey;

  get sortedPersons() {
    // if there's a sort param, don't show the modal.
    if (this.sort) this.modalIndex.hideModal();
    const sortKey = this.sort ?? "name";
    return this.data.sortedPersons(sortKey);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module "@ember/controller" {
  interface Registry {
    index: IndexController;
  }
}
