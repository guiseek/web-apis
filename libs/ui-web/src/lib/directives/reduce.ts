import type { CallbackReduce } from '../interfaces';

export const reduce = <T, R>(
  items: T[],
  callback: CallbackReduce<T, R>,
  initialValue: R
) => items.reduce(callback, initialValue);
