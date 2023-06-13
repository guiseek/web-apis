import { concat } from '../utilities/concat';
import { textHtml } from './text-html';

export function css(
  strings: TemplateStringsArray,
  ...values: unknown[]
): HTMLStyleElement {
  const styleEl = document.createElement('style');
  let styles = '';

  for (let i = 0; i < strings.length; i++) {
    styles += strings[i];
    if (i < values.length) {
      styles += concat(values[i]);
    }
  }

  styleEl.innerHTML = styles;

  return styleEl;
}
