import { noop } from '../utilities';

export function on<
  KEv extends keyof HTMLElementEventMap,
  PEv extends keyof HTMLElementEventMap[KEv]
>(event: KEv, property?: PEv) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const connected = target.connectedCallback ?? noop;

    target.connectedCallback = function (): void {
      this.addEventListener(event, (e: HTMLElementEventMap[KEv]) => {
        target[propertyKey].call(this, property ? e[property] : e);
      });

      connected.call(this);
    };

    return descriptor;
  };
}
