// Types for compiled templates
declare module "un-silencing-slavery/templates/*" {
  import { TemplateFactory } from "htmlbars-inline-precompile";
  const tmpl: TemplateFactory;
  export default tmpl;
}
