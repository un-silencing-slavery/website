import { helper } from "@ember/component/helper";
import { htmlSafe } from "@ember/template";

export function displayGlossaryDefinition([definition]: [string] /*, hash*/) {
  return htmlSafe(definition.replace("[READ MORE HERE]", ""));
}

export default helper(displayGlossaryDefinition);
