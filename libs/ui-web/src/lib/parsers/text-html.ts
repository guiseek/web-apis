export function textHtml<T extends Element>(text: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  return doc.body.firstChild as T;
}
