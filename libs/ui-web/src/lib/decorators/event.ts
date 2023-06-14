import { Emitter, noop } from '../utilities';

export function event() {
  return <T extends HTMLElement>(target: T, property: PropertyKey): any => {
    const parent = target as any;
    const connected = parent.connectedCallback ?? noop;

    parent.connectedCallback = function () {
      this[property] = new Emitter<string | symbol>(
        this,
        property !== undefined ? property.toString() : parent.key
      );
      connected.call(this);
    };
  };
}
