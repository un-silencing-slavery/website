import Component from '@glimmer/component';
import { action } from "@ember/object";
import { select } from "d3-selection";
import { axisBottom } from "d3-axis";
import { format } from "d3-format";

export default class CommunityTreeYearScaleBarComponent extends Component {
  @action callAxis(element){
    while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
    }
    select(element).append("g")
      .call(axisBottom(this.args.yearScale)
        .tickValues([1817, 1820, 1823, 1826, 1829, 1832])
        .tickFormat(format(".4r"))
      );
  }
  // Gradient legend
  /*defs
    .append("linearGradient")
    .attr("id", "ageBar-gradient")
    .selectAll("stop")
    .data([
      { offset: "0%", color: d3.interpolateViridis(0) },
      { offset: "10%", color: d3.interpolateViridis(0.1) },
      { offset: "20%", color: d3.interpolateViridis(0.2) },
      { offset: "30%", color: d3.interpolateViridis(0.3) },
      { offset: "40%", color: d3.interpolateViridis(0.4) },
      { offset: "50%", color: d3.interpolateViridis(0.5) },
      { offset: "60%", color: d3.interpolateViridis(0.6) },
      { offset: "70%", color: d3.interpolateViridis(0.7) },
      { offset: "80%", color: d3.interpolateViridis(0.8) },
      { offset: "90%", color: d3.interpolateViridis(0.9) },
      { offset: "100%", color: d3.interpolateViridis(1) }
    ])
    .enter()
    .append("stop")
    .attr("offset", d => d.offset)
    .attr("stop-color", d => d.color);
  */
  /*
  rangeBarG
    .append("rect")
    .attr("class", "bar")
    .attr("id", "ageBar-rect")
    // .attr("fill", "url(#ageBar-gradient)")
    .attr("transform", "translate(0, -15)")
    .attr("x", 0)
    // Moves placement of gradient-color part of legend
    .attr("y", 0)
    // Sets height/width of gradient bar
    .attr("width", width / 2)
    .attr("height", 10);
    */
}
