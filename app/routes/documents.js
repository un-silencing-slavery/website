import Route from "@ember/routing/route";

export default class DocumentsRoute extends Route {
  model() {
    return [
      {
        id: "rh01",
        title: "Rose Hall Slave Register 1817",
        date: 1817,
        type: "manuscript",
        location: "National Archives of the United Kingdom, Kew, England",
        artist: "",
      },
      {
        id: "rh02",
        title: "Rose Hall Slave Register 1820",
        date: 1820,
        type: "manuscript",
        location:
          "Jamaica Archives and Records Department, Spanish Town, Jamaica and National Archives of the United Kingdom, Kew, England",
        artist: "",
      },
      {
        id: "rh03",
        title: "Rose Hall Slave Register 1823",
        date: 1823,
        type: "manuscript",
        location:
          "Jamaica Archives and Records Department, Spanish Town, Jamaica and National Archives of the United Kingdom, Kew, England",
        artist: "",
      },
      {
        id: "rh04",
        title: "Rose Hall Slave Register 1826",
        date: 1826,
        type: "manuscript",
        location:
          "Jamaica Archives and Records Department, Spanish Town, Jamaica and National Archives of the United Kingdom, Kew, England",
        artist: "",
      },
      {
        id: "rh05",
        title: "Rose Hall Slave Register 1829",
        date: 1829,
        type: "manuscript",
        location:
          "Jamaica Archives and Records Department, Spanish Town, Jamaica and National Archives of the United Kingdom, Kew, England",
        artist: "",
      },
      {
        id: "rh06",
        title: "Rose Hall Slave Register 1832",
        date: 1832,
        type: "manuscript",
        location: "National Archives of the United Kingdom, Kew, England",
        artist: "",
      },
      {
        id: "rh07",
        title: "Rose Hall Estate",
        date: "1820-1821",
        type: "drawing",
        location: "University College London, Special Collections, England",
        artist: "James Hakewill",
      },
    ];
  }
}
