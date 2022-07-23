import Route from "@ember/routing/route";

export default class DocumentsRoute extends Route {
  metaInfo = {
    title: "Documents | (Un)Silencing Slavery",
  };

  model() {
    return [
      {
        id: "rh01",
        title: "Rose Hall Slave Register 1817",
        date: 1817,
        type: "manuscript",
        file: "pdf",
        location: "National Archives of the United Kingdom, Kew, England",
        description:
          "The first slave register of Rose Hall in 1817 lists all enslaved individuals at Rose Hall as of June 30, 1817. The register is separated into two sub-lists—grouped under “Males” and “Females” (with males consistently listed first).",
      },
      {
        id: "rh02",
        title: "Rose Hall Slave Register 1820",
        date: 1820,
        type: "manuscript",
        file: "tif",
        location:
          "Jamaica Archives and Records Department, Spanish Town, Jamaica and National Archives of the United Kingdom, Kew, England",
        description:
          "The registers of 1820, 1823, 1826, 1829, and 1832 offer specific names of the enslaved women, men, and children at Rose Hall. These registers list only those enslaved persons who had been born and those who had passed in the three-year period between slave registers. The registers are separated into two sub-lists—grouped under “Males” and “Females” (with males consistently listed first).",
      },
      {
        id: "rh03",
        title: "Rose Hall Slave Register 1823",
        date: 1823,
        type: "manuscript",
        file: "pdf",
        location:
          "Jamaica Archives and Records Department, Spanish Town, Jamaica and National Archives of the United Kingdom, Kew, England",
        description:
          "The registers of 1820, 1823, 1826, 1829, and 1832 offer specific names of the enslaved women, men, and children at Rose Hall. These registers list only those enslaved persons who had been born and those who had passed in the three-year period between slave registers. The registers are separated into two sub-lists—grouped under “Males” and “Females” (with males consistently listed first).",
      },
      {
        id: "rh04",
        title: "Rose Hall Slave Register 1826",
        date: 1826,
        type: "manuscript",
        file: "pdf",
        location:
          "Jamaica Archives and Records Department, Spanish Town, Jamaica and National Archives of the United Kingdom, Kew, England",
        description:
          "The registers of 1820, 1823, 1826, 1829, and 1832 offer specific names of the enslaved women, men, and children at Rose Hall. These registers list only those enslaved persons who had been born and those who had passed in the three-year period between slave registers. The registers are separated into two sub-lists—grouped under “Males” and “Females” (with males consistently listed first).",
      },
      {
        id: "rh05",
        title: "Rose Hall Slave Register 1829",
        date: 1829,
        type: "manuscript",
        file: "pdf",
        location:
          "Jamaica Archives and Records Department, Spanish Town, Jamaica and National Archives of the United Kingdom, Kew, England",
        description:
          "The registers of 1820, 1823, 1826, 1829, and 1832 offer specific names of the enslaved women, men, and children at Rose Hall. These registers list only those enslaved persons who had been born and those who had passed in the three-year period between slave registers. The registers are separated into two sub-lists—grouped under “Males” and “Females” (with males consistently listed first).",
      },
      {
        id: "rh06",
        title: "Rose Hall Slave Register 1832",
        date: 1832,
        type: "manuscript",
        file: "tif",
        location: "National Archives of the United Kingdom, Kew, England",
        description:
          "The registers of 1820, 1823, 1826, 1829, and 1832 offer specific names of the enslaved women, men, and children at Rose Hall. These registers list only those enslaved persons who had been born and those who had passed in the three-year period between slave registers. The registers are separated into two sub-lists—grouped under “Males” and “Females” (with males consistently listed first).",
      },
      {
        id: "rh07",
        title: "Rose Hall Estate",
        date: "1820-1821",
        type: "drawing",
        file: "jpg",
        location: "University College London, Special Collections, England",
        description:
          "This drawing of the Rose Hall Great House was created by James Hakewill (1778-1843). Hakewill was an English architect and illustrator. While travelling in Jamaica in the early 1820s, Jamaican plantation owners commissioned him to create drawings of their respective estates and surrounding landscapes. His drawings are highlighted in his book, A Picturesque Tour of the Island of Jamaica, which was published in London in 1825.",
      },
    ];
  }
}
