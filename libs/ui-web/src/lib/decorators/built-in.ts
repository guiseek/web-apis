import { BuiltInOptions } from '../interfaces';
import { getCycle } from '../utilities';

export function BuiltIn(selector: `${string}-${string}`, opts: BuiltInOptions) {
  return function (target: CustomElementConstructor) {
    const cycle = getCycle(target);

    customElements.define(selector, target, { extends: opts.extends });
  };
}
