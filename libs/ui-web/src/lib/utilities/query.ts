type SelectorCase<K extends string> =
  | `${K}.${string}`
  | `${K}#${string}`
  | `${K}[${string}]`
  | `${string} ${K}`;

export function query<K extends keyof SVGElementTagNameMap>(
  name: K | SelectorCase<K>,
  parent?: Element
): SVGElementTagNameMap[K];
export function query<K extends keyof HTMLElementTagNameMap>(
  name: K | SelectorCase<K>,
  parent?: Element
): HTMLElementTagNameMap[K];
export function query<
  K extends keyof (HTMLElementTagNameMap | HTMLElementTagNameMap)
>(name: K | SelectorCase<K>, parent: Element = document.body) {
  return parent.querySelector(name);
}
