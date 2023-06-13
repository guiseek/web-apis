import { ModifierMap, ModifierName } from '../interfaces';

export function pipe<T>(
  value: T,
  modifiers: (`${ModifierName}` | `${ModifierName}:${string | number}`)[]
): T | string | number {
  const modifierMap: ModifierMap<T> = {
    uppercase(value) {
      return String(value).toUpperCase();
    },
    lowercase(value) {
      return String(value).toLowerCase();
    },
    capitalize(value) {
      if (typeof value === 'string') {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      }
      return value;
    },
    trim(value) {
      if (typeof value === 'string') {
        return value.trim();
      }
      return value;
    },
    repeat(value, count: number) {
      return String(value).repeat(count);
    },
    reverse(value) {
      if (typeof value === 'string') {
        return value.split('').reverse().join('');
      }
      return value;
    },
    date(value) {
      return new Date(value);
    },
    multiply(value, factor) {
      if (typeof +value === 'number' && typeof +factor === 'number') {
        return +value * +factor;
      }
      return value;
    },
    // Adicione outros modificadores conforme necessário
  };

  return modifiers.reduce((result, modifier) => {
    const [modifierName, ...modifierArgs] = modifier.split(':') as [
      ModifierName,
      ...any[]
    ];
    const modifierCallback = modifierMap[modifierName];
    return modifierCallback
      ? modifierCallback(result as string, ...modifierArgs)
      : result;
  }, value);
}
