import { Selector } from '../interfaces';

export function query<K extends keyof SVGElementTagNameMap>(
  name: K | Selector<K>,
  parent?: Element | ShadowRoot
): SVGElementTagNameMap[K];
export function query<K extends keyof HTMLElementTagNameMap>(
  name: K | Selector<K>,
  parent?: Element | ShadowRoot
): HTMLElementTagNameMap[K];
export function query<
  K extends keyof (HTMLElementTagNameMap | HTMLElementTagNameMap)
>(
  name: K | Selector<K>,
  parent: Element | ShadowRoot | undefined = document.body
) {
  return parent.querySelector(name);
}
