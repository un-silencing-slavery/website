import { discoverEmberDataModels } from "ember-cli-mirage";
import { createServer } from "miragejs";

export default function (config) {
  let finalConfig = {
    ...config,
    models: { ...discoverEmberDataModels(), ...config.models },
    routes() {
      // this.namespace = '/api'

      // this.resource('user')
      this.resource("people");
    },
  };

  return createServer(finalConfig);
}
