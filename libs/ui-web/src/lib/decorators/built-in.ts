import { BuiltInOptions } from "../interfaces";
import { getCycle } from "../utilities";

export function BuiltIn({ selector, ...opts }: BuiltInOptions) {
  return function (target: CustomElementConstructor) {
    const cycle = getCycle(target);
  }
}
