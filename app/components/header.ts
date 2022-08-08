import Component from "@glimmer/component";

export default class HeaderComponent extends Component {
  get navItems() {
    return [
      { route: "index", text: "Home" },
      { route: "about" },
      { route: "reflections" },
      { route: "documents" },
      { route: "credits" },
      { route: "bibliography" },
      { route: "glossary" },
      {
        href: "https://ugapress.org/book/9780820362151/unsilencing-slavery/",
        text: "The Book",
      },
    ];
  }
}
