export interface CustomConstructor extends CustomElementConstructor {
  new (...params: any[]): HTMLElement
  attributeChangedCallback(name: keyof this, prev: string, next: string): void;
}
