import type { CallbackMap } from '../interfaces';

export const map = <T, R>(items: T[], callback: CallbackMap<T, R>) =>
  items.map(callback);

