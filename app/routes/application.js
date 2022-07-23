import Route from "@ember/routing/route";
import "un-silencing-slavery/style/styles.css";

export default class ApplicationRoute extends Route {
  headTags = [
    {
      type: "meta",
      tagId: "meta-og-name",
      attrs: {
        property: "og:name",
        content: "(Un)Silencing Slavery",
      },
    },
    {
      type: "link",
      tagId: "canonical-link",
      attrs: {
        rel: "canonical",
        content: "https://rose-hall.moacir.com",
      },
    },
  ];
}
