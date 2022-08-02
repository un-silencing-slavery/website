declare module "ember-promise-modals" {
  import Component from "@glimmer/component";

  interface OpenModalOptions {
    close(component: Component): void;
  }

  export default interface Modals {
    open(component: Component, options: OpenModalOptions): void;
    close(component: Component): void;
  }
}
