import type { CallbackMap } from '../interfaces';

export const pages = <R>(n: number, callback: CallbackMap<number, R>) =>
  Array.from({ length: n + 1 }, (_, i) => callback(i));
