type ModifierName =
  | 'uppercase'
  | 'lowercase'
  | 'capitalize'
  | 'trim'
  | 'repeat'
  | 'reverse'
  | 'date'
  | 'multiply';

type ModifierCallback<T> = (value: T, ...args: any[]) => any;

interface ModifierMap<T> {
  uppercase: ModifierCallback<string>;
  lowercase: ModifierCallback<string>;
  capitalize: ModifierCallback<string>;
  trim: ModifierCallback<string>;
  repeat: ModifierCallback<string | number>;
  reverse: ModifierCallback<string | number | string[] | number[]>;
  date: ModifierCallback<Date | string | number>;
  multiply: ModifierCallback<string | number>;
}

export type { ModifierName, ModifierCallback, ModifierMap };
