import Route from '@ember/routing/route';
import faker from "faker";

export default class PeopleRoute extends Route {
  model() {
    const people = [];
    for(let i = 1; i < 209; i += 1){
      const person = this.store.createRecord("person", {
        name: faker.name.firstName(),
        origin: "Creole" , 
        birthYear: 1800 ,
        exitYear: 1832 ,
        slug: "blah-1" ,
        gender: "Female" ,
        color: "Quadroon",
      });

      people.push(person);
    }

    return people;
  }
}
