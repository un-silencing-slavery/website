import Modifier from "ember-modifier";
import { service } from "@ember/service";
import { select, zoom } from "d3";

export default class ZoomModifier extends Modifier {
  @service svg;

  modify() {
    select("svg.zoomable").call(
      zoom()
        .extent([
          [0, 0],
          [this.svg.width, this.svg.height],
        ])
        .scaleExtent([1, 8])
        .on("zoom", this.zoomed)
    );
  }

  zoomed({ transform }) {
    select("g.zoomable").attr("transform", transform);
  }
}
