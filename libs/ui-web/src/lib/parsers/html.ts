import { concat, create } from '../utilities';

export function html(strings: TemplateStringsArray, ...values: unknown[]) {
  let innerHTML = '';
  for (let i = 0; i < strings.length; i++) {
    innerHTML += strings[i];
    if (i < values.length) {
      innerHTML += concat(values[i]);
    }
  }

  return create('template', { innerHTML });
}
