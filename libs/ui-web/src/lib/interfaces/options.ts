export interface ElementOptions {
  selector: string;
}

export interface AutonomousOptions
  extends ElementOptions,
    Partial<ShadowRootInit> {}

export interface BuiltInOptions
  extends ElementOptions,
    ElementDefinitionOptions {}

export interface UIWebOptions extends CustomElementConstructor {
  selector?: string;
  observed?: string[];
  template?: HTMLTemplateElement;
  styles?: HTMLStyleElement;
}
