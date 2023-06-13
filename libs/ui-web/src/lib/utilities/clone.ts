export function clone<T extends Element>(template: HTMLTemplateElement) {
  return template.content.cloneNode(true) as T;
}
