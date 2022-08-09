import Component from "@glimmer/component";
import { service } from "@ember/service";
import SvgService from "un-silencing-slavery/services/svg";
import DataService from "un-silencing-slavery/services/data";
import { schemeAccent, arc } from "d3";
import { dasherize } from "@ember/string";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

interface CommunityTreeAreaComponentArgs {
  yearScale(year: number): number;
  sortedPersons: Person[];
  sortKey: SortKey;
}

interface CategoryWithCount {
  count: number;
  category: string;
}

export default class CommunityTreeAreaComponent extends Component<CommunityTreeAreaComponentArgs> {
  @service declare svg: SvgService;

  @service declare data: DataService;

  @action hideTooltip(event: MouseEvent) {
    const element = event.target as SVGPathElement;
    element.setAttribute("stroke-width", "0");
    this.svg.showTooltip = false;
    this.svg.tooltipContent = "";
  }

  @action showTooltip(event: MouseEvent) {
    const element = event.target as SVGPathElement;
    element.setAttribute("stroke-width", "2");

    this.svg.tooltipContent =
      this.tooltipTexts[element.id.replace("-trigger", "")];
    this.svg.showTooltip = true;
  }

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
    const categories: CategoryWithCount[] = this.data.sortOrders[key].map(
      (category) => {
        return {
          category,
          count: this.args.sortedPersons.filter(
            (person) => person[this.data.clusterColumnMapping[key]] === category
          ).length,
        };
      }
    );

    const arcGenerator = arc();
    let startAngle = 0;

    return categories.map((categoryWithCount, index) => {
      const title = dasherize(categoryWithCount.category);
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

      const tooltipId = `community-tree-cluster-tooltip-${key}-${title}`;
      this.buildTooltipText(key, categoryWithCount, tooltipId);

      const slug = `community-tree-cluster-tooltip-trigger-${key}-${title}`;
      return {
        slug,
        border,
        d,
        color: schemeAccent[index + 1],
      };
    });
  }

  @tracked tooltipTexts: Record<string, string[]> = {};

  buildTooltipText(
    clusterKey: ClusterKey,
    { category, count }: CategoryWithCount,
    tooltipId: string
  ) {
    const denominator = this.data.people.length;
    const percentage = `(${Math.floor((100 * count) / denominator)}%)`;

    if (clusterKey === "duties") {
      const unknownDuties = this.data.people.filter(
        (person) => person.dutyCategory === "Not at Rose Hall in 1832"
      ).length;
      const dutiesDenominator = denominator - unknownDuties;
      const dutiesPercentage = `(${Math.floor(
        (100 * count) / dutiesDenominator
      )}%)`;

      const line1 = `Only the ${dutiesDenominator} enslaved persons still at Rose Hall`;

      let line2 = `in 1832 had duties recorded. Of those, ${count} ${dutiesPercentage}`;

      let line3 = `had their duties fall into the general category of`;

      let line4 = `“${category.toLowerCase()}.”`;

      if (category === "“Not at Work”") {
        line4 = `“Not at Work.”`;
      }

      if (category === "Not at Rose Hall in 1832") {
        line2 = `in 1832 had duties recorded. The majority of the`;
        line3 = `remaining ${count} ${percentage} persons had passed`;
        line4 = "between 1817 and 1832.";
      }

      this.tooltipTexts[tooltipId] = [line1, line2, line3, line4];
    } else {
      let text = `${count} ${percentage} had their ${clusterKey} marked as “${category}.”`;

      if (category === "Inconsistent") {
        text = `${count} ${percentage} had their ${clusterKey} marked inconsistently.`;
      }

      if (category === "Unknown") {
        text = `${count} ${percentage} did not have their ${clusterKey} recorded.`;
      }

      this.tooltipTexts[tooltipId] = [
        `Of the ${denominator} enslaved persons recorded at Rose Hall,`,
        text,
      ];
    }
  }
}
