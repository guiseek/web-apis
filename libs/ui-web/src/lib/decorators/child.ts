import { Selector } from '../interfaces';
import { noop } from '../utilities';

export function child<K extends keyof HTMLElementTagNameMap>(
  selector: K | Selector<K>
) {
  return <T extends HTMLElement>(target: T, property: PropertyKey) => {
    const parent = target as any;
    const connected = parent.connectedCallback ?? noop;
    parent.connectedCallback = function () {
      const scope = this.shadowRoot ? this.shadowRoot : this;
      this[property] = scope.querySelector(selector);
      connected.call(this);
    };
  };
}
