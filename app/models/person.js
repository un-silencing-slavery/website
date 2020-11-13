import Model, {attr} from '@ember-data/model';

export default class PersonModel extends Model {

  @attr name;
  @attr origin;
  @attr birthYear;
  @attr exitYear;
  @attr slug;
  @attr gender;
  @attr color;

}
