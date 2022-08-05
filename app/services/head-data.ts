import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class HeadDataService extends Service {
  @tracked title = "(Un)Silencing Slavery";

  // @tracked url = "https://rosehallproject.columbia.edu";
  @tracked url = "https://rose-hall.moacir.com";

  siteName = "(Un)Silencing Slavery";

  date = "2022-08-06";

  locale = "en_US";

  // canonical = "https://rosehallproject.columbia.edu";
  canonical = "https://rose-hall.moacir.com";

  // imgSrc = "/assets/images/open-graph.jpg";
  imgSrc = "https://i.imgur.com/f8KALn2.jpg";

  type = "website";

  description =
    "(Un)Silencing Slavery respectfully and lovingly remembers and holds space for the enslaved Africans and their enslaved African-born and Caribbean-born descendants who lived and labored at Rose Hall Plantation in Jamaica.";

  publisher = "Columbia University Libraries";

  creator =
    "Naylor, C. E., K. Akey, M. Z. Choksi, A. Gil, M. P. de Sá Pereira, M. J. S. Williams";

  creators = [
    "Naylor, Celia E.",
    "Akey, Kristen",
    "Choksi, Madiha Zahrah",
    "Gil, Alex",
    "Sá Pereira, Moacir P. de",
    "Williams, Monique J. S.",
  ];

  lcshSubjects = [
    "Rose Hall Plantation (Jamaica)",
    "Slaves--Jamaica--Montego Bay--Social conditions",
    "Plantation life--Jamaica--Montego Bay--History",
    "De Lisser, Herbert George, 1878-1944. The White Witch of Rosehall",
  ];

  language = "en";

  format = "text/html";
}

declare module "@ember/service" {
  interface Registry {
    headData: HeadDataService;
  }
}
