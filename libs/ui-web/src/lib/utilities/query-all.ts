import { Selector } from '../interfaces';

export function queryAll<K extends keyof SVGElementTagNameMap>(
  name: K | Selector<K>,
  parent?: Element | ShadowRoot
): NodeListOf<SVGElementTagNameMap[K]>;
export function queryAll<K extends keyof HTMLElementTagNameMap>(
  name: K | Selector<K>,
  parent?: Element | ShadowRoot
): NodeListOf<HTMLElementTagNameMap[K]>;
export function queryAll<
  K extends keyof (HTMLElementTagNameMap | HTMLElementTagNameMap)
>(
  name: K | Selector<K>,
  parent: Element | ShadowRoot | undefined = document.body
) {
  return parent.querySelectorAll(name);
}
