import Route from "@ember/routing/route";

export default class IndexRoute extends Route {
  headTags = [
    {
      type: "meta",
      tagId: "meta-og-name",
      attrs: {
        property: "og:name",
        content: "boo (Un)Silencing Slavery",
      },
    },
    {
      type: "link",
      tagId: "canonical-link",
      attrs: {
        rel: "canonical",
        content: "https://barrose-hall.moacir.com",
      },
    },
  ];
}
