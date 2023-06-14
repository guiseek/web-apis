export interface AutonomousOptions extends Partial<ShadowRootInit> {}

export interface BuiltInOptions extends ElementDefinitionOptions {}

export interface UIWebOptions extends CustomElementConstructor {
  selector?: string;
  observed?: string[];
  template?: HTMLTemplateElement;
  styles?: HTMLStyleElement;
}
