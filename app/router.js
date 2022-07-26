import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route("index", { path: "/" }, function () {
    this.route("person", { path: "/people/:person_slug" });
  });
  this.route("about");
  this.route("bibliography");
  this.route("reflections");
  this.route("credits");
  this.route("documents");
  this.route("glossary");
});
