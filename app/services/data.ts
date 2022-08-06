import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import people from "un-silencing-slavery/data/people";
import groupBy from "un-silencing-slavery/utils/group-by";

export default class DataService extends Service {
  @tracked people = people as Person[];

  @tracked sortKey: SortKey = "name";

  maxAge = 80;

  get peopleAsObject() {
    const peopleAsObject: Record<string, Person> = {};
    this.people.map((person) => (peopleAsObject[person.personId] = person));
    return peopleAsObject;
  }

  sortOrders: Record<ClusterKey, string[]> = {
    colour: [
      "Negro",
      "Mulatto",
      "Sambo",
      "Quadroon",
      "Inconsistent",
      "Unknown",
    ],
    duties: [
      "Field Workers",
      "Craft Workers",
      "Domestic Workers",
      "Livestock Workers",
      "“Not at Work”",
      "Not at Rose Hall in 1832",
    ],
    nativity: ["African", "Creole", "Inconsistent", "Unknown"],
    gender: ["Female", "Male", "Unknown"],
  };

  clusterColumnMapping: Record<ClusterKey, keyof Person> = {
    colour: "colour",
    duties: "dutyCategory",
    nativity: "country",
    gender: "gender",
  };

  customSort() {
    const customSortKeys = Object.keys(this.sortOrders);
    if (customSortKeys.includes(this.sortKey)) {
      const customSort = this.sortKey as ClusterKey;
      const ordering = new Map(
        this.sortOrders[customSort].map((v: string, i: number) => [v, i])
      );

      this.people.sort(
        (a, b) =>
          ordering.get(a[this.clusterColumnMapping[customSort]]) -
          ordering.get(b[this.clusterColumnMapping[customSort]])
      );
    }
  }

  sortedPersons(sortKey: SortKey) {
    this.sortKey = sortKey;
    switch (sortKey) {
      case "name":
        this.people.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "age":
        this.people.sort(
          (a, b) => (a.birthYear || 1833) - (b.birthYear || 1833)
        );
        break;
      case "colour":
        this.customSort();
        break;
      case "nativity":
        this.customSort();
        break;
      case "gender":
        this.customSort();
        break;
      case "matrilineage":
        this.sortByFamily();
        break;
      case "duties":
        this.customSort();
        break;
      default:
        break;
    }

    return this.people;
  }

  sortByFamily() {
    // cluster by moms
    const movePerson = (fromIndex: number, toIndex: number) => {
      const element = this.people[fromIndex];
      this.people.splice(fromIndex, 1);
      this.people.splice(toIndex, 0, element);
    };

    this.people.sort((a, b) => {
      // Matriarchs to the front.
      if (a.motherId === null && b.motherId === null) {
        return (
          this.people.filter((person) => person.motherId === b.personId)
            .length -
          this.people.filter((person) => person.motherId === a.personId).length
        );
      }

      return (a.motherId || "").localeCompare(b.motherId || "");
    });

    for (let i = 0; i < this.people.length; i += 1) {
      const person = this.people[i];
      const children = this.people.filter(
        (child) => child.motherId === person.personId
      );
      if (children.length > 0) {
        for (const child of children) {
          movePerson(this.people.indexOf(child), i + 1);
        }
      }
    }
  }

  matrilinealTree = [
    {
      P192: [
        // Rachel 62
        "P80", // Peter
      ],
    },
    {
      P177: [
        // Memmy Sen 60
        {
          P178: [
            // Miranda
            {
              P176: [
                // Memmy Jun
                "P39", // Isaac
              ],
            },
            {
              P147: [
                // Glister
                "P93", // Sam
                "P171", // Marinda
              ],
            },
            {
              P124: [
                // Christianna
                "P34", // Henry
                "P152", // Jane
              ],
            },
            "P152", // Patrick
          ],
        },
      ],
    },
    {
      P193: [
        // Rebecca 52
        "P136", // Doshy
        "P24", // Exeter
      ],
    },
    {
      P118: [
        // Cecelia 48
        {
          P164: [
            // Liddy
            "P184", // Pastora
            "P69", // North
            "P74", // Parish
          ],
        },
        "P98", // Smith
        "P32", // Harry
      ],
    },
    {
      P120: [
        // Celia 1772
        {
          P131: [
            // Delia 1787
            "P84", // Quaco
          ],
        },
        {
          P195: [
            // Rosannah 1787
            {
              P173: [
                // Mary James
                "P187", // Peggy 1820
                "P48", // John Kerr 1822
                "P35", // Henry McLean 1825
                "P139", // Eliza Hill 1828
                "P23", // Edward Hill 1830
              ],
            },
          ],
        },
        "P52", // Lewis
        "P56", // MacGuire
        {
          P114: [
            // Bell 1803
            "P53", // Lewis 1822
            "P194", // Rosanna 1827
            "P61", // Maxwell 1828
            "P67", // Ned 1831
          ],
        },
      ],
    },
    {
      P135: [
        //Dorothy 1772
        "P146", // Giss
      ],
    },
    {
      P149: [
        // Hope 1772
        {
          P159: [
            // Juno
            "P73", // Othello 1816
            "P191", // Prue 1820
            "P119", // Cecelia 1822
            "P167", // Lydia 1824
            "P150", // Hope 1828
            "P203", // Susan 1831
            "P90", // Robert 1832
          ],
        },
        "P27", // George
      ],
    },
    {
      P169: [
        // Maphe 1772
        {
          P172: [
            // Mary
            "P66", // Ned 1817
            "P46", // John 1820
            "P199", // Sally Rose 1822
            "P44", // Jemmy 1826
            "P5", // Alick 1829
          ],
        },
      ],
    },
    {
      P175: [
        // May 1773
        "P166", // Lucretia 1789
        "P156", // Joan 1798
        "P198", // Sabina 1799
        "P186", // Peggy 1803
      ],
    },
    {
      P130: [
        // Daphney 1777
        "P183", // Parthenia
        "P142", // Fanny
      ],
    },
    {
      P180: [
        // Nancy 1777
        {
          P160: [
            // Kate
            "P162", // Leddy
          ],
        },
        {
          P174: [
            // Matilda
            "P2", // Adam 1825
            "P59", // Marcus 1827
            "P206", // Sylvia 1831
          ],
        },
        "P145", // Frankey
      ],
    },
    {
      P190: [
        // Polly 1777
        "P95", // Scipio
      ],
    },
    {
      P200: [
        // Sarah 1777
        "P179", // Molly Spence
        "P107", // William 1798
        {
          P116: [
            // Bessy 1804
            "P87", // Richard 1822
            "P89", // Robert 1828
          ],
        },
        {
          P151: [
            // Jane Cranston 1814
            "P168", // Lydie
          ],
        },
      ],
    },
    {
      P112: [
        // Augusta 1779
        "P11", // Ben 1800
        "P81", // Pitt 1803
        {
          P117: [
            // Brown 1806
            "P122", // Charity
          ],
        },
        "P126", // Clarinda 1812
        "P70", // Oliver 1815
      ],
    },
    {
      P201: [
        // Stella 1785
        "P143", // Flora
      ],
    },
    {
      P134: [
        // Dorinda 1787
        "P92", // Sam 1806
        "P7", // Anthony 1810
        "P108", // Wm. Kerr 1815
        "P63", // Morris 1818
        "P4", // Allick 1820
        "P99", // Surry 1821
        "P138", // Eliza 1822
        "P207", // Venus 1825
        "P47", // John 1829
      ],
    },
    {
      P208: [
        // Zebra 1789
        "P9", // Archy 1806
        "P196", // Rose 1808
        {
          P132: [
            // Dianna 1812
            "P41", // James Watson
          ],
        },
        "P41", // James 1813
        "P16", // Charles 1818
        "P88", // Robert 1820
      ],
    },
    {
      P123: [
        // Charlotte 1792
        "P133", // Doll 1814
        "P100", // Thomas 1816
      ],
    },
    {
      P204: [
        // Susannah J 1792
        "P51", // July 1813
        "P148", // Helen 1815
        "P188", // Phillis 1818
        "P141", // Eve 1820
        "P140", // Ellen 1822
        "P101", // Thomas 1828
      ],
    },
    {
      P182: [
        // Panella 1794
        "P129", // Daisy
      ],
    },
    {
      P154: [
        // Jeany 1797
        "P115", // Bess 1823
        "P202", // Suckey 1826
      ],
    },
    {
      P121: [
        // Chance 1798
        "P144", // Frances
      ],
    },
    {
      P128: [
        // Cynthia 1803
        "P165", // Lizzy Elizabeth
      ],
    },
    "P54", // Lewis-ney 1747
    "P83", // Prague 1747
    "P155", // Jreen 1751
    "P6", // Andrew 1757
    "P55", // Luke 1755
    "P185", // Peachy 1757
    "P37", // Hyde 1759
    "P28", // Gibbes 1762
    "P79", // Perth 1762
    "P102", // Titus 1762
    "P25", // Fox
    "P19", // Craigie
    "P33", // Hazard
    "P49", // John Parish 1767
    "P50", // Johnny 1767
    "P58", // March 1767
    "P64", // Nab 1767
    "P71", // Orpheus 1767
    "P72", // Osirus 1767
    "P75", // Paton 1767
    "P12", // Bolton
    "P110", // Amelia 1772
    "P65", // Neath 1772
    "P76", // Patrick 1772
    "P104", // Washington 1772
    "P105", // Watt 1772
    "P86", // Richard 1774
    "P43", // January 1775
    "P113", // Beck 1777
    "P14", // Bush
    "P17", // Charlie
    "P127", // Cowslip 1777
    "P137", // Dove 1777
    "P26", // Garrick
    "P29", // Glasgow
    "P31", // Hannibal
    "P153", // Janet 1777
    "P163", // Lenora 1777
    "P57", // Mackay 1777
    "P68", // Nestor 1777
    "P78", // Penryn 1777
    "P82", // Plato 1777
    "P85", // Ralph 1777
    "P197", // Ruth 1777
    "P94", // Sambo 1777
    "P96", // Scott 1777
    "P103", // Ulysses 1777
    "P20", // Damon 1779
    "P91", // Ross 1780
    "P8", // Apollo 1781
    "P111", // Arabella 1782
    "P158", // Julina 1782
    "P13", // Bryan
    "P45", // Joe 1785
    "P1", // Aaron 1787
    "P18", // Colin 1787
    "P22", // Dublin 1787
    "P181", // Nelly 1787
    "P106", // William 1787
    "P109", // William Scott 1787
    "P21", // Daniel
    "P97", // Shamoun
    "P205", // Susannah Scott
    "P3", // Adonis
    "P15", // Caesar
    "P62", // Mercury 1792
    "P189", // Phoeba
    "P125", // Clara
    "P36", // Hercules
    "P30", // Gloster
    "P60", // Mark
    "P161", // Kitty
    "P157", // Julian
    "P10", // Arteris
    "P38", // Isaac
    "P40", // Jack
    "P170", // Mariah
  ];
}

declare module "@ember/service" {
  interface Registry {
    data: DataService;
  }
}
