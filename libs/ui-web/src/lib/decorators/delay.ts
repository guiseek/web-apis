import { DebounceOptions } from '../interfaces';
import debounce from '../utilities/debounce';

export function delay(milliseconds = 0, options: DebounceOptions = {}) {
  return function (
    target: HTMLElement,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const map = new WeakMap();
    const originalMethod = descriptor.value;
    descriptor.value = function (...params: unknown[]) {
      let debounced = map.get(this);
      if (!debounced) {
        debounced = debounce(originalMethod, milliseconds, options).bind(this);
        map.set(this, debounced);
      }
      debounced(...params);
    };
    return descriptor;
  };
}
