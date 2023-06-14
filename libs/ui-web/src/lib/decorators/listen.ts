import { Selector } from '../interfaces';
import { noop } from '../utilities';

export function listen<
  KEl extends keyof HTMLElementTagNameMap,
  KEv extends keyof HTMLElementEventMap,
  PEv extends keyof HTMLElementEventMap[KEv]
>(selector: KEl | Selector<KEl>, event: KEv, property?: PEv) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const connected = target.connectedCallback ?? noop;

    target.connectedCallback = function (): void {
      let elements: HTMLElement[] = [];

      if (this.shadowRoot) {
        elements = this.shadowRoot.querySelectorAll(selector);
      } else {
        elements = this.querySelectorAll(selector);
      }

      const onEvent = (e: HTMLElementEventMap[KEv]) => {
        target[propertyKey].call(this, property ? e[property] : e);
      };

      elements.forEach((el) => el.addEventListener(event, onEvent));

      connected.call(this);
    };

    return descriptor;
  };
}
