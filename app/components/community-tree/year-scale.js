import Component from '@glimmer/component';
import { action } from "@ember/object";

export default class CommunityTreeYearScaleComponent extends Component {

  get years(){
    return [1817, 1820, 1823, 1826, 1829, 1832].map(year => {
      return {
        year,
        radius: this.args.yearScale(year),
      }
    });
  }
}
