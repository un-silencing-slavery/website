import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class ModalIndexService extends Service {
  @tracked showModal = true;

  hideModal() {
    this.showModal = false;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module "@ember/service" {
  interface Registry {
    "modal-index": ModalIndexService;
  }
}
