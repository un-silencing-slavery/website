import Route from '@ember/routing/route';
import faker from "faker";

export default class IndexRoute extends Route {
  model() {
    const people = [];

    for(let i = 1; i < 208; i += 1){
      const birthYear = Math.floor(Math.random() * 70) + 1760;
      let exitYear = Math.random() < 0.66 
        ? 1832 
        : birthYear < 1818 
          ? Math.floor(Math.random() * 13) + 1818
          : Math.floor(Math.random() * (1832 - birthYear) + birthYear);
      const name = faker.name.firstName();
      const person = this.store.createRecord("person", {
        id: `p${i}`,
        name,
        birthYear,
        exitYear: exitYear += 0.1,
        slug: `${name.toLowerCase()}-p${i}`,
        gender: Math.random() < 0.5 ? "Male" : "Female",
        color: Math.random() < 0.85 
        ? "Negro" : Math.random() < 0.33 
        ? "Quadroon" : Math.random() < 0.5
        ? "Sambo" : "Mulatto",
        origin: Math.random() < 0.72
        ? "Creole" : Math.random() < 0.90 
        ? "African" : Math.random() < 0.5
        ? "Creole/African?" : "not_specified",
      });

      people.push(person);
    }

    return people.sort((a, b) => a.birthYear - b.birthYear);//.filter(p => p.birthYear > 1810);
    // return [people[0]];
  }
 }
