type Selector<K extends string> =
  | `${K}.${string}`
  | `${K}#${string}`
  | `${K}[${string}]`
  | `${string} ${K}`;

export type { Selector };
