import Component from "@glimmer/component";
import { service } from "@ember/service";
import SvgService from "un-silencing-slavery-at-rose-hall/services/svg";
import DataService from "un-silencing-slavery-at-rose-hall/services/data";
import { schemeAccent, arc } from "d3";

interface CommunityTreeAreaComponentArgs {
  yearScale(year: number): number;
}

// type ColumnMap = Record<SortKey, keyof Person>;
interface ColumnMap {
  race: keyof Person;
  origin: keyof Person;
  gender: keyof Person;
}

type GroupedPeople = Record<string, Person[]>;

export default class CommunityTreeAreaComponent extends Component<CommunityTreeAreaComponentArgs> {
  @service declare svg: SvgService;

  @service declare data: DataService;

  get clusters() {
    const groups: Person[] | GroupedPeople = this.splitIntoGroups();
    if (groups instanceof Array) {
      return [];
    } else {
      let i = 0;
      const clusters = [];
      const arcGenerator = arc();
      let startAngle = 0;
      for (const title in groups) {
        const people = groups[title];
        const theta = (people.length / this.data.people.length) * 2 * Math.PI;
        const d = arcGenerator({
          innerRadius: this.args.yearScale(1817),
          outerRadius: this.svg.circleRadius,
          startAngle,
          endAngle: startAngle + theta,
        });

        startAngle += theta;

        clusters.push({
          border: d?.split("L")[0],
          title,
          color: schemeAccent[i],
          d,
        });

        i += 1;
      }
      return clusters;
    }
  }

  splitIntoGroups() {
    if ("race origin gender".split(" ").includes(this.data.sortKey)) {
      const sortKey = this.data.sortKey as keyof ColumnMap;
      const columnMap: ColumnMap = {
        race: "color",
        origin: "country",
        gender: "gender",
      };
      return this.data.people.reduce((group: GroupedPeople, person: Person) => {
        const column = person[columnMap[sortKey]] ?? "";
        group[column] = group[column] ?? [];
        group[column].push(person);
        return group;
      }, {});
    } else {
      return [];
    }
  }
}
