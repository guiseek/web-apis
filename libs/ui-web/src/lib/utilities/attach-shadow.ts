export function attachShadow<T extends Element>(
  type: T,
  init?: Partial<ShadowRootInit>,
  html?: T
) {
  const shadow = type.attachShadow(
    Object.assign(
      {
        mode: 'open',
      },
      init
    )
  );
  if (html) shadow.append(html);
  return shadow;
}
