import { CustomConstructor } from "../interfaces"

export function Attribute(): any {
  return (target: CustomConstructor) => {
    target!.attributeChangedCallback = function (
      name: string,
      prev: string,
      next: string
    ) {
      (this as any)[name] = next
    }
  }
}
