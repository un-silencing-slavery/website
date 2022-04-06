// Types for compiled templates
declare module "rose-hall/templates/*" {
  import { TemplateFactory } from "htmlbars-inline-precompile";
  const tmpl: TemplateFactory;
  export default tmpl;
}
