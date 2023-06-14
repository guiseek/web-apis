export interface CustomConstructor extends CustomElementConstructor {
  new (...params: any[]): HTMLElement
  connectedCallback(): void
  disconnectedCallback(): void
  attributeChangedCallback(name: keyof this, prev: string, next: string): void;
}
