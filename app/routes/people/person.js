import Route from '@ember/routing/route';

export default class PeoplePersonRoute extends Route {
  async model({ personId }) {
    const people = await this.modelFor("index");
    return {
      personId,
      people
    }
  }
}
