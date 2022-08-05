"use strict";

module.exports = function(environment) {
  let ENV = {
    "ember-meta": {
      title: "(Un)Silencing Slavery",
      imgSrc: "/assets/images/open-graph.jpg",
      siteName: "(Un)Silencing Slavery",
      description:
        "(Un)Silencing Slavery respectfully and lovingly remembers and holds space for the enslaved Africans and their enslaved African-born and Caribbean-born descendants who lived and labored at Rose Hall Plantation in Jamaica.",
      publisher: "Columbia University Libraries",
      creator:
        "Naylor, C. E., K. Akey, M. Z. Choksi, A. Gil, M. P. de Sá Pereira, M. J. S. Williams",
      creators: [
        "Naylor, Celia E.",
        "Akey, Kristen",
        "Choksi, Madiha Zahrah",
        "Gil, Alex",
        "Sá Pereira, Moacir P. de",
        "Williams, Monique J. S.",
      ],
      lcshSubjects: [
        "Rose Hall Plantation (Jamaica)",
        "Slaves--Jamaica--Montego Bay--Social conditions",
        "Plantation life--Jamaica--Montego Bay--History",
        "De Lisser, Herbert George, 1878-1944. The White Witch of Rosehall",
      ],
    },
    modulePrefix: "un-silencing-slavery",
    environment,
    rootURL: "/",
    locationType: "history",
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === "development") {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.locationType = "none";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;
  }

  if (environment === "production") {
    // here you can enable a production-specific feature
  }

  return ENV;
};
