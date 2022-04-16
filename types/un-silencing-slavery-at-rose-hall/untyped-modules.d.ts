declare module "ember-promise-modals" {
  import ModalsIndexComponent from "un-silencing-slavery-at-rose-hall/components/modals-index";

  interface OpenModalOptions {
    close(component: ModalsIndexComponent): void;
  }

  export default interface Modals {
    open(component: ModalsIndexComponent, options: OpenModalOptions): void;
    close(component: ModalsIndexComponent): void;
  }
}
