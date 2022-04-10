import Component from "@glimmer/component";

export default class CommunityTreeBackgroundComponent extends Component {
  get frondArray() {
    const frondNumber = 10;
    const array = [];
    for (let i = 0; i < frondNumber; i += 1) {
      array.push(i);
    }

    return array;
  }
}
