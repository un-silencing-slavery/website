import Route from '@ember/routing/route';
import faker from "faker";

export default class IndexRoute extends Route {
  model() {
    const people = [];

    for(let i = 1; i < 209; i += 1){
      const birthYear = Math.floor(Math.random() * 70) + 1760;
      const exitYear = Math.random() < 0.66 
        ? 1832 
        : Math.floor(Math.random() * 13) + 1818;
      const name = faker.name.firstName();
      const person = this.store.createRecord("person", {
        id: `p${i}`,
        name,
        origin: "Creole" , 
        birthYear,
        exitYear,
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

    return people;
  }
 }
