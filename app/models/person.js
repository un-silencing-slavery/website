import Model, { attr } from "@ember-data/model";

export default class PersonModel extends Model {
  @attr name;
  @attr country;
  @attr birthYear;
  @attr exitYear;
  @attr slug;
  @attr gender;
  @attr colour;
}
