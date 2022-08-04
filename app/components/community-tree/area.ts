import Component from "@glimmer/component";
import { service } from "@ember/service";
import SvgService from "un-silencing-slavery/services/svg";
import DataService from "un-silencing-slavery/services/data";
import { schemeAccent, arc } from "d3";

interface CommunityTreeAreaComponentArgs {
  yearScale(year: number): number;
  sortedPersons: Person[];
  sortKey: SortKey;
}

export default class CommunityTreeAreaComponent extends Component<CommunityTreeAreaComponentArgs> {
  @service declare svg: SvgService;

  @service declare data: DataService;

  get clusterKey(): ClusterKey {
    return this.args.sortKey as ClusterKey;
  }

  get clustered() {
    return ["gender", "colour", "nativity", "duties"].includes(
      this.args.sortKey
    );
  }

  get clusters() {
    const key = this.clusterKey as ClusterKey;
    const categories = this.data.sortOrders[key].map((category) => {
      return {
        category,
        count: this.args.sortedPersons.filter(
          (person) => person[this.data.clusterColumnMapping[key]] === category
        ).length,
      };
    });

    const arcGenerator = arc();
    let startAngle = 0;

    return categories.map((categoryWithCount, index) => {
      const title = categoryWithCount.category;
      const theta =
        (categoryWithCount.count / this.args.sortedPersons.length) *
        2 *
        Math.PI;
      const d = arcGenerator({
        innerRadius: this.args.yearScale(1817),
        outerRadius: this.svg.circleRadius,
        startAngle,
        endAngle: startAngle + theta,
      });

      const border = arcGenerator({
        innerRadius: 0.99 * this.svg.circleRadius,
        outerRadius: 1.01 * this.svg.circleRadius,
        startAngle,
        endAngle: startAngle + theta,
      });

      startAngle += theta;

      return {
        border,
        title,
        d,
        color: schemeAccent[index + 1],
      };
    });
  }
}
