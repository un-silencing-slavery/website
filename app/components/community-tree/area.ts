import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import { action } from "@ember/object";
import SvgService from "un-silencing-slavery-at-rose-hall/services/svg";
import DataService from "un-silencing-slavery-at-rose-hall/services/data";
import { arc } from "d3";

interface CommunityTreeAreaComponentArgs {
  yearScale(year: number): number;
}

export default class CommunityTreeAreaComponent extends Component<CommunityTreeAreaComponentArgs> {
  @service declare svg: SvgService;

  @service declare data: DataService;

  get clusters() {
    const returnClusters = [];

    if (this.data.sortKey === "name") {
      const arcGenerator = arc();
      const clusters = [];
      clusters.push(
        this.data.people.filter((person) => /^[ABCDEFG]/.test(person.name))
      );
      clusters.push(
        this.data.people.filter((person) => /^[HIJKLMNOP]/.test(person.name))
      );
      clusters.push(
        this.data.people.filter((person) => /^[QRSTUVWXYZ]/.test(person.name))
      );

      let startAngle = 0;

      for (const [i, cluster] of clusters.entries()) {
        const titles = ["A–G", "H–P", "Q–Z"];
        const theta = (cluster.length / this.data.people.length) * 2 * Math.PI;
        const d = arcGenerator({
          innerRadius: this.args.yearScale(1817),
          outerRadius: this.svg.circleRadius,
          startAngle,
          endAngle: startAngle + theta,
        });

        startAngle += theta;

        returnClusters.push({
          title: titles[i],
          fill: i % 2 === 0,
          d,
        });
      }
      return returnClusters;
    }
  }
}
