import Component from '@glimmer/component';

export default class CommunityTreeComponent extends Component {
  width = 250;

  height = 250;

  dataLength = this.args.data.length;

  // transform(i) {
  //   const string = `translate(25,${i * 10})`;
  //   console.log(string);
  // return string;
// }
}
